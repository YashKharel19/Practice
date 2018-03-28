import React from 'react';
import XHRUploader from './xhruploader.js';

const UPLOAD_URL = 'http://localhost:3000/api/uploadfile';

const Demo = () => (
  <div>
    <article>
      <p>Default usage comes up with an upload button for manual instantiation of the upload and supports one file.</p>
      <pre style={{ fontSize: 10 }}>
        {`
        <XHRUploader
          url='${UPLOAD_URL}'
        />
      `}
      </pre>
      <XHRUploader url={UPLOAD_URL} />
    </article>
  </div>
);

export default Demo;
