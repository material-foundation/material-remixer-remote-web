/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import * as React from 'react';

/** Returns a stateless page layout template. */
export function PageLayout(props: any) {
  return (
    <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
      <header className='mdl-layout__header'>
        <div className='mdl-layout__header-row'>
          <img src='remixer.svg' alt='Remixer Remote' />
        </div>
      </header>
      <main className='mdl-layout__content'>
        <div className='page-content'>
          {props.children}
        </div>
      </main>
    </div>
  );
}
