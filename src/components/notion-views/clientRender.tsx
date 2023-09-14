"use client";

import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'
import { Collection } from 'react-notion-x/build/third-party/collection'

export const PageSample = ({ recordMap }) => (
  	<NotionRenderer
  		recordMap={recordMap}
		fullPage={true}
		darkMode={false}
		components={{Collection}}
	/>
)

export default PageSample;