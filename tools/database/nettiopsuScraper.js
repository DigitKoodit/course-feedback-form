//TODO: remove request and use axios/fetch
import request from 'request'; // Had to use request due to encoding
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import fs from 'fs';
import path from 'path';

const defaultSite = 'https://nettiopsu.utu.fi/opas/tutkintoOhjelma.htm?rid=30437&uiLang=fi&lang=fi&lvv=2016';
// content="text/html; charset=ISO-8859-1

export default class NettiopsuScraper {

  constructor(websiteUrl) {
    this.modules = [];
    this.courses = [];
    this.url = websiteUrl;
    this.$ = {};
  }

  parseModulesAndCourses = () =>
    new Promise(resolve => {
      fetchSiteElements(this.url)
        .then($ => {
          this.$ = $;
          return parseModules(this.$);
        })
        .then(modules => {
          this.modules = modules;
          const promises = [];
          modules.map(module => {
            const promise = this.parseCoursesByModule(this.$, module.id);
            promises.push(promise);
          })
          return Promise.all(promises);
        })
        .then(courseArrays => {
          courseArrays.map(coursesByModule => {
            this.courses = [...this.courses, ...coursesByModule]
          })
          resolve();
        });
    });

  //FIXME: really ugly solution appending classes courses within a response.
  // Did it in order to prevent duplicate values
  parseCoursesByModule = ($, moduleId) =>
    new Promise(resolve => {
      const classCourseElement = '.tutrak_subElement_oj';
      const courses = [];
      $('#' + moduleId).find(classCourseElement).map((index, element) => {
        // TODO: make more reliable with calidations etc
        const name = $(element).children().text().trim();
        const id = $(element).text().split(name)[0].trim()
        const credits = $(element).text().split(name)[1].substr(2).trim();
        const course = {
          id,
          name: formatString(name),
          credits: parseCredits(credits),
          moduleId
        }
        if (!containsDuplicate(id, this.courses)) {
          this.courses.push(course);
        }
      });
      resolve(courses);
    })


  writeCoursesToFile = () => {
    writeJsonArrayToFile(this.courses, 'courses');
  }

  writeModulesToFile = () => {
    writeJsonArrayToFile(this.modules, 'modules');
  }
}

export const parseModules = $ =>
  new Promise(resolve => {
    const classModuleElement = '.tutrak_okokonaisuus_level_0';
    const modules = [];
    $(classModuleElement).map((index, element) => {
      // TODO: make more reliable with calidations etc
      const name = $(element).children().eq(2)
        .text()
        .trim()
        .replace('\n', '');
      const id = $(element).attr('id');
      const module = {
        id,
        name: formatString(name)
      }
      modules.push(module);
    });
    resolve(modules);
  })


export const fetchSiteElements = webSite =>
  new Promise((resolve, reject) => {
    request({
      encoding: null,
      method: 'GET',
      uri: webSite
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      const encodedData = iconv.decode(body, 'ISO-8859-1');
      const $ = cheerio.load(encodedData);
      resolve($);
    })
  });

export const parseCourses = $ => {
  const classCourseElement = '.tutrak_subElement_oj';
  return new Promise(resolve => {
    const courses = [];
    $(classCourseElement).map((index, element) => {
      // TODO: make more reliable with calidations etc
      const name = $(element).children().text().trim();
      const id = $(element).text().split(name)[0].trim()
      const credits = $(element).text().split(name)[1].substr(2).trim();
      const course = {
        id,
        name,
        credits
      }
      if (!containsDuplicate(id, courses)) {
        courses.push(course);
      }
    });
    resolve(courses);
  })
}

const containsDuplicate = (idToFind, array) => {
  const dublicateObject = array.find(obj => obj.id === idToFind);
  if (dublicateObject) {
    return true;
  }
  return false;
}



export const writeJsonArrayToFile = (json, filename) => {
  if (json && json.length > 0) {
    const stringValues = JSON.stringify(json);
    fs.writeFileSync(path.join(__dirname, filename + '.json'), stringValues);
  }
}

//FIXME: Could done betters
export const formatString = text => {
  if (text && text.length > 0) {
    // Check whethet string contains roman numerals or course tag and lowercase everything else
    // e.g. 'Insinöörimatematiikka A' or 'Matemaattinen optimointi II'
    const parts = text.split(' ').map((part, index) => {
      if (index < text.split(' ').length - 1 || part.length >= 3) {
        return part.toLowerCase();
      }
      return part;
    });

    const formatted = parts.reduce((result, part, index) =>
      result + (index > 0 ? ' ' : '') + part
    );

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  return text;
}

/**
 * Credit format from Nettiopsu is by default 'x op'.
 */
export const parseCredits = creditString => {
  if (creditString) {
    return parseInt(creditString.charAt(0), 10);
  }
  return 0;

}