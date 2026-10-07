import {
  AutoGrid,
  Badge,
  Card,
  Markdown,
  Stack,
  Stat,
  Text,
} from '@devstroop/react-uikit';

const SWEEP_CMD = `# recommended profile for stores >= 10k rows
cargo run -q -p nql-bench --features hnsw -- --recall --rows 50000 \\
  --hnsw-m 32 --hnsw-ef 256

# the CI gate (defaults, 5k regime — never moves silently)
cargo test -p nqlite --test recall --features hnsw`;

export default function Benchmarks() {
  return (
    <Stack gap={24}>
      <Text textStyle="displayH2">Benchmarks</Text>
      <Text>
        Every number is engine-only and bound to a commit, profile, and machine
        — methodology, raw runs, and an honest “where nqlite is weak” section
        live in docs/benchmarks.md.
      </Text>

      <AutoGrid min={200} gap={16}>
        <Stat
          label="100K reopen"
          value="0.26 s"
          hint="core-only lazy load, release"
        />
        <Stat
          label="100K ingest"
          value="3.74 s"
          hint="line protocol, in-process"
        />
        <Stat
          label="exact-scan floor"
          value="75–140 ms"
          hint="per query @100K — sub-10 ms needs ANN"
        />
        <Stat
          label="recall@10 gate"
          value="≥ 0.95"
          hint="5k rows, CI-enforced"
        />
      </AutoGrid>

      <Card
        header={
          <Stack gap={8}>
            <Badge severity="info">HNSW parameter sweep</Badge>
            <Text>2026-10-07 — recall@10 held ≥ 0.95 at every rung</Text>
          </Stack>
        }
      >
        <AutoGrid min={160} gap={16}>
          <Stat label="1k rows" value="1.000" hint="m32 / efc200 / ef256" />
          <Stat label="5k rows" value="1.000" hint="defaults: 0.960" />
          <Stat label="50k rows" value="0.975" hint="defaults: 0.795" />
        </AutoGrid>
        <Markdown
          value={
            'Defaults (`m16 / efc200 / ef64`) stay — they pass the 5k gate;\n' +
            'the gate never moves silently. Cost split: `m`/`efc` = build time,\n' +
            '`ef` = live query beam.\n\n' +
            '```bash\n' +
            SWEEP_CMD +
            '\n```'
          }
        />
      </Card>

      <Card header={<Text textStyle="displayH6">Method</Text>}>
        <Markdown
          value={
            '- Deterministic corpora (xorshift64\\*, seed 42), zero-LLM, no network\n' +
            '- Recall = HNSW vs exact brute-force top-K on a dim-64 set\n' +
            '- Cross-DB quality matrix (sqlite-vec / LanceDB / Chroma):\n' +
            '  [scripts/bench-compare](https://github.com/devstroop/nqlite/tree/develop/scripts/bench-compare)\n' +
            '- Full tables: [docs/benchmarks.md](https://github.com/devstroop/nqlite/blob/develop/docs/benchmarks.md)'
          }
        />
      </Card>
    </Stack>
  );
}
