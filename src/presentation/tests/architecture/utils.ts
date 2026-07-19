import { Project, type SourceFile } from "ts-morph";

const project = new Project({
  compilerOptions: {
    allowJs: true,
    jsx: 4,
  },
});

export function getPresentationSourceFiles(): SourceFile[] {
  return project
    .addSourceFilesAtPaths("src/presentation/**/*.{ts,tsx}")
    .filter((f) => !f.getFilePath().endsWith(".test.tsx") && !f.getFilePath().endsWith(".test.ts"));
}

export function getImports(sourceFile: SourceFile): string[] {
  const imports: string[] = [];
  for (const moduleSpecifier of sourceFile.getImportDeclarations()) {
    const spec = moduleSpecifier.getModuleSpecifierValue();
    imports.push(spec);
  }
  for (const dynamicImport of sourceFile.getDescendantStatements()) {
    dynamicImport.forEachChild(() => {});
  }
  return imports;
}
