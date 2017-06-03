import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Home from '../../src/containers/Home';
/* eslint-disable no-undef */

describe('Home component', () => {
  const wrapper = shallow(<Home />);
  describe('handleSelect', () => {
    it('should set new active course', () => {
      const dummyEvent = {
        event: {
          target: {
            value: 'DUMMY_ID'
          }
        }
      }

      wrapper.handleSelect(dummyEvent);
      expect(wrapper.state.activeCourse.id).toNotExist();
    })
  })
});
