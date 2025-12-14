import fs from 'fs';
import PDFParser from 'pdf2json';

const RESUME_PATH = 'public/assets/resume.pdf';
const OUTPUT_PATH = 'src/data/resume-data.json';

const pdfParser = new PDFParser(this, 1);

pdfParser.on('pdfParser_dataError', errData => {
  console.error('Error parsing PDF:', errData.parserError);
  process.exit(1);
});

pdfParser.on('pdfParser_dataReady', pdfData => {
  let text = '';
  for (const page of pdfData.Pages) {
    let lastY = -1;
    let textRow = [];
    for (const item of page.Texts) {
      if (lastY !== -1 && item.y !== lastY) {
        text += textRow.join(' ') + '\n';
        textRow = [];
      }
      textRow.push(item.R.map(r => decodeURIComponent(r.T)).join(''));
      lastY = item.y;
    }
    text += textRow.join(' ') + '\n';
  }

  const resumeData = parseRawText(text);

  if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data');
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(resumeData, null, 2));
  console.log(`Resume data saved to ${OUTPUT_PATH}`);
});

function parseRawText(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0 && !line.match(/^\s*$/) && !line.match(/Page \(\d+\) Break/) && !line.match(/^May 2024 \d+$/));

    const data = {
        name: '',
        location: '',
        summary: '',
        skills: '',
        experience: [],
        education: [],
    };

    data.name = lines.find(line => line.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/)) || '';
    
    const locationLine = lines.find(line => line.match(/, (Virginia|NY|Jordan)/));
    if (locationLine) {
        data.location = locationLine.split(',')[0].trim();
    }

    const summaryStartIndex = lines.findIndex(line => line.startsWith('CAREER OVERVIEW')) + 1;
    const skillsIndex = lines.findIndex(line => line.startsWith('SKILLS OVERVIEW'));
    data.summary = lines.slice(summaryStartIndex, skillsIndex).join(' ').replace(/\d{3}-\d{3}-\d{4} • [\w.-]+@[\w.-]+ LinkedIn/g, '').trim();

    const experienceIndex = lines.findIndex(line => line.startsWith('WORK EXPERIENCE'));
    data.skills = lines.slice(skillsIndex + 1, experienceIndex).join(' ');

    const educationIndex = lines.findIndex(line => line.startsWith('EDUCATION'));
    const educationLines = lines.slice(educationIndex + 1);
    const degreeLine = educationLines[0] || '';
    const universityLine = educationLines[1] || '';
    
    const yearMatch = degreeLine.match(/\((\d{4})\)/);
    data.education.push({
        degree: degreeLine.replace(/, \(\d{4}\)/, '').trim(),
        year: yearMatch ? yearMatch[1] : '',
        university: universityLine,
    });

    const experienceLines = lines.slice(experienceIndex + 1, educationIndex);
    let currentJob = null;
    const jobTitleRegex = /^(Consulting Senior Manager|Human Resources Project Manager|Senior Consultant)$/; 

    for (let i = 0; i < experienceLines.length; i++) {
        const line = experienceLines[i];
        if (jobTitleRegex.test(line)) {
            if (currentJob) data.experience.push(currentJob);
            currentJob = { title: line, company: '', date: '', location: '', description: [] };
            
            const nextLine = experienceLines[++i];
            const companyRegex = /^(.*?), (VA|NY|Jordan) \s*\((.*)\)$/; 
            const match = nextLine.match(companyRegex);
            if (match) {
                currentJob.company = match[1].trim();
                currentJob.location = match[2].trim();
                currentJob.date = match[3].replace(/\s*–\s*/, '-').trim();
            }
        } else if (line.startsWith('•')) {
            if (currentJob) {
                let description = line.substring(1).trim();
                let j = i + 1;
                while(j < experienceLines.length && !experienceLines[j].match(jobTitleRegex) && !experienceLines[j].startsWith('•') && !experienceLines[j].match(/^(.*?), (VA|NY|Jordan) \s*\((.*)\)$/)) {
                    description += ' ' + experienceLines[j];
                    j++;
                }
                i = j - 1;
                currentJob.description.push(description);
            }
        }
    }
    if (currentJob) data.experience.push(currentJob);

    return data;
}

if (!fs.existsSync(RESUME_PATH)) {
  console.error('Resume PDF not found at:', RESUME_PATH);
  process.exit(1);
}

pdfParser.loadPDF(RESUME_PATH);
