import { Card, Markdown, Stack, Text } from '@devstroop/react-uikit';

const BUILD = `# CLI (binary: target/release/nql)
cargo build --release --package nql-cli

# REPL
cargo run -q -p nql-cli
>> CREATE TABLE turn VECTOR<f32, 384>;
>> INSERT INTO turn:1 { "role": "user", "text": "I work on the ML team" };
>> SELECT * FROM turn;`;

const PERSIST = `# REPL or script mode backed by one file (WAL sidecar, ACID)
cargo run -q -p nql-cli -- --db memory.nql
cargo run -q -p nql-cli -- --db memory.nql --script session.nql
# :flush inside the REPL checkpoints the WAL into the main file`;

const AGENTS = `# MCP server (stdio): execute_nql, create_table, insert_record,
# relate, forget, select, match_path, closure — deterministic JSON
cargo run -q -p nql-mcp -- --db memory.nql

# Line protocol (TCP or stdio): each line is its own plan starting at
# the root store — MEMORY must prefix every statement it scopes
printf 'MEMORY core; CREATE TABLE note; MEMORY core; INSERT INTO note:1 { "text": "x" };\\n' \\
  | cargo run -q -p nql-server -- --stdio`;

const RUST = `use nql::parse;
use nqlite::Database;
use nql_ir::Store;

let mut db = Database::new(Store::default());
let plan = parse("CREATE TABLE t; INSERT INTO t:1 { \\"a\\": 1 };")?;
let results = db.execute(&plan)?;`;

export default function QuickStart() {
  return (
    <Stack gap={24}>
      <Text textStyle="displayH2">Quick start</Text>
      <Text>
        Four ways in — a shell, a file, an agent transport, and the library.
        Requirements: Rust 1.82+, no system dependencies.
      </Text>

      <Card header={<Text textStyle="displayH6">1 · CLI & REPL</Text>}>
        <Markdown value={'```bash\n' + BUILD + '\n```'} />
      </Card>

      <Card header={<Text textStyle="displayH6">2 · Persist to one file</Text>}>
        <Markdown value={'```bash\n' + PERSIST + '\n```'} />
      </Card>

      <Card
        header={
          <Text textStyle="displayH6">3 · Agents: MCP + line protocol</Text>
        }
      >
        <Markdown value={'```bash\n' + AGENTS + '\n```'} />
        <Markdown
          value={
            'Add `--db memory.nql` to `nql-server` for a persistent store —\n' +
            'same single-writer semantics as the CLI.'
          }
        />
      </Card>

      <Card header={<Text textStyle="displayH6">4 · Embed in Rust</Text>}>
        <Markdown value={'```rust\n' + RUST + '\n```'} />
      </Card>

      <Card header={<Text textStyle="displayH6">Full walkthrough</Text>}>
        <Markdown
          value={
            'The complete quick start — every transport, the MCP tool list,\n' +
            'and the line-protocol MEMORY rule — lives in the\n' +
            '[README quick start](https://github.com/devstroop/nqlite#quick-start),\n' +
            'with runnable agent recipes in\n' +
            '[docs/agent-patterns.md](https://github.com/devstroop/nqlite/blob/develop/docs/agent-patterns.md).'
          }
        />
      </Card>
    </Stack>
  );
}
