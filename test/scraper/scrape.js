import NettiopsuScraper, { fetchSiteElements } from '../../tools/database/nettiopsuScraper';
/* eslint-disable no-undef */


const guideTkk2016 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=30437&uiLang=fi&lang=fi&lvv=2016'; // 106 different courses 5 modules
const guideDi2016 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=30439&uiLang=fi&lang=fi&lvv=2016'; // 68

const guideTkk2015 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=22415&uiLang=fi&lang=fi&lvv=2015' // 116
const guideDi2015 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=22332&uiLang=fi&lang=fi&lvv=2015'; // 51

//Terveystieteiden maisterin tutkinto
const guideTtM2016 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=30431&uiLang=fi&lang=fi&lvv=2016';

const selectedProgram = guideTkk2016;

const scraper = new NettiopsuScraper(selectedProgram);
scraper.parseModulesAndCourses()
  .then(() => {
    scraper.writeCoursesToFile();
    scraper.writeModulesToFile();
    console.log('done');
  })
  .catch(err => {
    console.log(err);
  });

