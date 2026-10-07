import { useState } from 'react';
import {
  Badge,
  Body,
  Button,
  Footer,
  Header,
  Layout,
  Link,
  Stack,
  Text,
} from '@devstroop/react-uikit';

import Benchmarks from './pages/Benchmarks';
import Docs from './pages/Docs';
import Home from './pages/Home';
import QuickStart from './pages/QuickStart';

// Everything visual comes from @devstroop/react-uikit (components, tokens,
// dx- utilities) — no bespoke CSS (house rule: reetail-admin pattern).
// Routing is app-owned state (the uikit is deliberately route-agnostic).

type Page = 'home' | 'start' | 'docs' | 'bench';

const NAV: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'start', label: 'Quick start' },
  { id: 'docs', label: 'Docs' },
  { id: 'bench', label: 'Benchmarks' },
];

function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <Layout>
      <Header sticky>
        <Stack
          orientation="horizontal"
          justify="between"
          align="center"
          gap={16}
        >
          <Link onClick={() => setPage('home')}>
            <Text textStyle="displayH6">nqlite</Text>
          </Link>
          <Stack orientation="horizontal" align="center" gap={16}>
            {NAV.map((n) =>
              page === n.id ? (
                <Badge key={n.id} severity="primary">
                  {n.label}
                </Badge>
              ) : (
                <Link key={n.id} onClick={() => setPage(n.id)}>
                  {n.label}
                </Link>
              )
            )}
            <Link href="https://github.com/devstroop/nqlite">GitHub</Link>
            <Button
              severity="primary"
              href="https://github.com/devstroop/nqlite#quick-start"
            >
              Get started
            </Button>
          </Stack>
        </Stack>
      </Header>

      <Body>
        {page === 'home' && <Home onStart={() => setPage('start')} />}
        {page === 'start' && <QuickStart />}
        {page === 'docs' && <Docs />}
        {page === 'bench' && <Benchmarks />}
      </Body>

      <Footer>
        <Stack
          orientation="horizontal"
          justify="between"
          align="center"
          gap={12}
          wrap
        >
          <Text>
            nqlite — Apache License 2.0 · built with @devstroop/react-uikit
          </Text>
          <Stack orientation="horizontal" gap={16}>
            <Link href="https://github.com/devstroop/nqlite">GitHub</Link>
            <Link href="https://github.com/devstroop/nqlite/blob/develop/LICENSE">
              License
            </Link>
          </Stack>
        </Stack>
      </Footer>
    </Layout>
  );
}

export default App;
