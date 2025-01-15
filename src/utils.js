import worksData from '@/data.json'
const works = worksData

export function getYears() {
  let years = []
  works.forEach((work) => {
    if (!years.includes(work.year)) {
      years.push(work.year)
    }
  })
  return years
}

export function getProjects() {
  let projects = []
  works.forEach((work) => {
    if (work.project === '') {
      return
    }
    if (!projects.includes(work.project)) {
      projects.push(work.project)
    }
  })
  return projects.sort()
}
getProjects()

export function normalizeName(string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll(' ', '_')
    .toLowerCase()
}

export function normalizeProjectName() {
  let projects = getProjects()
  let normalizedProjects = []
  for (const project of projects) {
    normalizedProjects.push(normalizeName(project))
  }
  return normalizedProjects
}
