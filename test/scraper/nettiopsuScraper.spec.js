import expect from 'expect';
import NettiopsuScraper, { fetchSiteElements } from '../../tools/database/nettiopsuScraper';
/* eslint-disable no-undef */


const guideTkk2016 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=30437&uiLang=fi&lang=fi&lvv=2016'; // 106 different courses 5 modules
const guideDi2016 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=30439&uiLang=fi&lang=fi&lvv=2016'; // 68

const guideTkk2015 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=22415&uiLang=fi&lang=fi&lvv=2015' // 116
const guideDi2015 = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=22332&uiLang=fi&lang=fi&lvv=2015'; // 51

const selectedProgram = guideTkk2016;

// describe('parseCourses', () => {
//   it('should return an array full of courses', () => {
//     return fetchSiteElements(selectedProgram)
//       .then($ => {
//         parseCourses($)
//           .then(courses => {
//             expect(courses.length).toBe(106);
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
// });

describe('parseModules', () => {
  it('should parse return modules', () => {
    const scraper = new NettiopsuScraper(selectedProgram);
    return scraper.parseModulesAndCourses()
      .then(() => {
        expect(scraper.courses.length).toBe(106);
        expect(scraper.modules.length).toBe(5);

        scraper.writeCoursesToFile();
      });
  });
});
