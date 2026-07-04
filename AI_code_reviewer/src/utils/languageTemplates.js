export const languageTemplates = {
  javascript: `async function fetchUserData(id) {\n  const query = \`SELECT * FROM users WHERE id = '\${id}'\`; // Potential SQL Injection\n  const result = await db.execute(query);\n\n  while (true) { // Warning: Infinite loop path\n    if (result.length > 0) break;\n    console.log("Retrying...");\n  }\n  return result[0];\n}`,
  python: `def fetch_user_data(user_id):\n    # Vulnerable to dynamic execution string injections\n    query = f"SELECT * FROM users WHERE id = '{user_id}'"\n    result = db.execute(query)\n    return result[0]`,
  typescript: `async function fetchUserData(id: string) {\n  const query = \`SELECT * FROM users WHERE id = '\${id}'\`;\n  const result = await db.execute(query);\n  return result[0];\n}`
};