import {Header} from '../playground/header'
import {shallow} from 'enzyme'
import React from 'react'

test('test component',()=>{
  const x=shallow(<Header/>)
  expect(x).toMatchSnapshot();

})
