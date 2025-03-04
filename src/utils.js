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
    if (work.project === 'noproject') {
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

export function getType(fileName) {
  let type = ''
  if (fileName.slice(-3) === 'png') {
    type = 'image/png'
  }
  if (fileName.slice(-4) === 'webp') {
    type = 'image/webp'
  }
  return type
}

export function filterByYear(year) {
  let filteredWorks = []
  filteredWorks = works.filter((work) => work.year === year)
  return filteredWorks
}

export function filterByProject(project) {
  let filteredWorks = []
  filteredWorks = works.filter((work) => work.project === project)
  return filteredWorks
}
