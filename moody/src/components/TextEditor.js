import React, {useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../components/Text.css'
import ReactHtmlParser from 'react-html-parser';
import RadialMenu from './RadialMenu';
import { config } from '@fortawesome/fontawesome-svg-core';

function Editor() {

    const [value, setValue] = useState("") 
    const handleOnChange = (e, editor) => {
        // console.log(editor.getData())
        const data = editor.getData()
        setValue(data)
        // config.removePlugins = 'resize';
        // config.resize_enabled = false;
        // config.resize_dir = 'both';
        // config.width = 1000;
        // config.height = 1000;
        // editor.replace('body', {height: 500});
        
    }

    return (
        <div className='text-box'>
            <h1>Date</h1>
            <CKEditor className='ck-editor__editable' 
                editor = {ClassicEditor}
                onChange={handleOnChange}
                
            />
            {/* <div>
                {ReactHtmlParser(value)}
            </div> */}
            <div className="radial"> <RadialMenu/> </div>
        </div>
        
    )
}

export default Editor;