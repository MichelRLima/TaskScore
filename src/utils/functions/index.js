export function extrairDisciplinas(concursos) {
  return concursos
    ?.filter((item) => Array.isArray(item?.disciplinas)) // garante que disciplinas existe e é array
    ?.flatMap((item) => item?.disciplinas); // junta todos os arrays em um só
}

export function encontrarConcursoPorDisciplina(
  disciplinasPorConcurso,
  disciplinaId
) {
  const concurso = disciplinasPorConcurso.find((c) =>
    c.disciplinas?.some((d) => d.id === disciplinaId)
  );
  return concurso?.id || null;
}
