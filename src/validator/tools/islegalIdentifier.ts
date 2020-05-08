export function isLegalIdentifier(identifier: string): boolean {
  const matches = identifier.match(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/);
  if (matches == null || matches.length === 0) {
    return false;
  }

  const keywords = [
    "do",
    "if",
    "in",
    "for",
    "let",
    "new",
    "try",
    "var",
    "case",
    "else",
    "enum",
    "eval",
    "false",
    "null",
    "this",
    "true",
    "void",
    "with",
    "break",
    "catch",
    "class",
    "const",
    "super",
    "throw",
    "while",
    "yield",
    "delete",
    "export",
    "import",
    "public",
    "return",
    "static",
    "switch",
    "typeof",
    "default",
    "extends",
    "finally",
    "package",
    "private",
    "continue",
    "debugger",
    "function",
    "arguments",
    "interface",
    "protected",
    "implements",
    "instanceof",
  ];

  if (keywords.includes(identifier)) {
    return false;
  }

  return true;
}
