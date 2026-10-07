import {
  AutoGrid,
  Badge,
  Button,
  Card,
  Markdown,
  Stack,
  Stat,
  Text,
} from '@devstroop/react-uikit';

const FEATURES: {
  title: string;
  body: string;
  tone: 'info' | 'success' | 'secondary';
}[] = [
  {
    title: 'One transaction',
    tone: 'info',
    body: 'Records, typed graph relations, embedding vectors, and time update atomically — no frankenstack of separate stores.',
  },
  {
    title: 'Deterministic recall',
    tone: 'info',
    body: 'Hybrid kNN + BM25 fused with RRF in one query. Identical input ⇒ byte-identical results, always.',
  },
  {
    title: 'Time travel',
    tone: 'secondary',
    body: 'AS OF on SELECT, MATCH, and CLOSURE; HISTORY SINCE for exact deltas; PRUNE HISTORY to bound growth.',
  },
  {
    title: 'No-LLM by contract',
    tone: 'success',
    body: 'Vectors are BYO f32 arrays — the engine never embeds, chunks, summarizes, or reranks. Learning lives in the agent.',
  },
  {
    title: 'Single file, SQLite-style',
    tone: 'secondary',
    body: 'One embedded file with a WAL sidecar, single-writer lock, and snapshot readers. Open a path, start querying.',
  },
  {
    title: 'Agent transports built in',
    tone: 'info',
    body: 'Line-protocol server (TCP/stdio) and an MCP server ship in the box — compose nqlite into any agent stack.',
  },
];

const NQL_SAMPLE = `CREATE TABLE turn VECTOR<f32, 384>;
INSERT INTO turn:1 { "role": "user", "text": "I work on the ML team" } EMBED [ ... ];
RELATE (turn:1) -> :mentions -> (entity:acme) SET weight = 0.9;

-- hybrid retrieval + ranking, one statement
SELECT * FROM turn
  WHERE vector::similarity(embedding, [ ... ]) AND k = 5
  ORDER BY ::salience
  LIMIT 3;`;

export default function Home({ onStart }: { onStart: () => void }) {
  return (
    <Stack gap={48}>
      <Stack gap={16} align="center" style={{ paddingBlock: 48 }}>
        <Badge severity="info">No-LLM · deterministic · single-file</Badge>
        <Text textStyle="displayH1" textAlign="center">
          SQLite for AI memory
        </Text>
        <Text textAlign="center">
          A context-first, deterministic, single-file database for AI agents —
          records, typed graph relations, BYO embeddings, and time under one
          ACID transaction.
        </Text>
        <Stack orientation="horizontal" gap={12} justify="center">
          <Button severity="primary" onClick={onStart}>
            Get started
          </Button>
          <Button href="https://github.com/devstroop/nqlite">GitHub</Button>
        </Stack>
      </Stack>

      <AutoGrid min={280} gap={16}>
        {FEATURES.map((f) => (
          <Card
            key={f.title}
            header={
              <Stack gap={8}>
                <Badge severity={f.tone}>{f.title}</Badge>
              </Stack>
            }
          >
            <Text>{f.body}</Text>
          </Card>
        ))}
      </AutoGrid>

      <Card
        header={
          <Text textStyle="displayH6">One language, one transaction</Text>
        }
      >
        <Markdown value={'```sql\n' + NQL_SAMPLE + '\n```'} />
      </Card>

      <AutoGrid min={200} gap={16}>
        <Stat label="100K reopen" value="0.26 s" hint="release build, warm" />
        <Stat
          label="100K ingest"
          value="3.74 s"
          hint="line protocol, in-process"
        />
        <Stat label="recall@10" value="≥ 0.95" hint="5k rows, CI gate" />
        <Stat
          label="workspace tests"
          value="252"
          hint="fmt + clippy + CI green"
        />
      </AutoGrid>
    </Stack>
  );
}
