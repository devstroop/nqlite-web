import {
  AutoGrid,
  Badge,
  Card,
  Link,
  Markdown,
  Stack,
  Text,
} from '@devstroop/react-uikit';

const LANGUAGE = `-- hybrid retrieval + ranking in one statement
SELECT * FROM turn
  WHERE vector::similarity(embedding, [ ... ]) AND k = 5
  ORDER BY ::salience            -- α·sim + β·strength + γ·importance + δ·score
  LIMIT 3;

-- time travel: what did I know at ts 42?
SELECT * FROM turn AS OF 42;
HISTORY SINCE 10;                -- exact mutation deltas, edges included
FORGET turn:1;                   -- delete record + its edges`;

const REFS: { href: string; label: string; note: string }[] = [
  {
    href: 'https://github.com/devstroop/nqlite/blob/develop/spec/nql.md',
    label: 'spec/nql.md',
    note: 'grammar & semantics — the normative NQL reference',
  },
  {
    href: 'https://github.com/devstroop/nqlite/blob/develop/spec/file-format.md',
    label: 'spec/file-format.md',
    note: 'on-disk format: v3 core frame, WAL, integrity',
  },
  {
    href: 'https://github.com/devstroop/nqlite/blob/develop/docs/decisions.md',
    label: 'docs/decisions.md',
    note: 'design intent: non-negotiables, decisions D1–D9',
  },
  {
    href: 'https://github.com/devstroop/nqlite/blob/develop/docs/benchmarks.md',
    label: 'docs/benchmarks.md',
    note: 'methodology, measured numbers, honest weaknesses',
  },
  {
    href: 'https://github.com/devstroop/nqlite/tree/develop/docs',
    label: 'docs/',
    note: 'full knowledge base: positioning, research, agent patterns',
  },
];

export default function Docs() {
  return (
    <Stack gap={24}>
      <Text textStyle="displayH2">Documentation</Text>

      <AutoGrid min={280} gap={16}>
        <Card header={<Badge severity="success">No-LLM guarantee</Badge>}>
          <Text>
            The engine never calls an LLM — not to embed, chunk, summarize,
            compact, or rerank. Vectors are BYO f32 arrays; learning lives in
            the agent. Hard contract, not a roadmap item.
          </Text>
        </Card>
        <Card header={<Badge severity="info">Deterministic execution</Badge>}>
          <Text>
            Identical (plan, store) ⇒ byte-identical results — no wall-clock, no
            randomness, no hidden model. The evidence harness re-asserts this
            with transcript digests on every run.
          </Text>
        </Card>
        <Card header={<Badge severity="secondary">Single-writer ACID</Badge>}>
          <Text>
            One writer, snapshot readers, sidecar WAL with torn-frame recovery.
            One process owns the file (flock-guarded); readers never block
            writers.
          </Text>
        </Card>
      </AutoGrid>

      <Card header={<Text textStyle="displayH6">NQL in one screen</Text>}>
        <Markdown value={'```sql\n' + LANGUAGE + '\n```'} />
      </Card>

      <Card header={<Text textStyle="displayH6">Reference</Text>}>
        <Stack gap={8}>
          {REFS.map((r) => (
            <Stack key={r.href} gap={2}>
              <Link href={r.href}>{r.label}</Link>
              <Text>{r.note}</Text>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}
