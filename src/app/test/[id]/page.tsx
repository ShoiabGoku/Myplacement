import { TESTS } from "@/data/tests";
import { TestRunner } from "@/components/test/TestRunner";

export const dynamicParams = false;

/** Pre-render one route per test, plus the reserved "practice" session route. */
export function generateStaticParams() {
  return [...TESTS.map((t) => ({ id: t.id })), { id: "practice" }];
}

export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TestRunner testId={id} />;
}
