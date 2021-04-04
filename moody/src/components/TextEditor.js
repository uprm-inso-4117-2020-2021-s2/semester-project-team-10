import React, {useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../components/Text.css'
import ReactHtmlParser from 'react-html-parser';
import RadialMenu from './RadialMenu';

function Editor() {

    const [value, setValue] = useState("") 
    const handleOnChange = (e, editor) => {
        // console.log(editor.getData())
        const data = editor.getData()
        setValue(data)
    }

    return (
        <div className='text-box'>
            <h1>Date</h1>
            <CKEditor 
                editor = {ClassicEditor}
                onChange={handleOnChange}
            />
            {/* <div>
                {ReactHtmlParser(value)}
            </div> */}
            <div> <RadialMenu/> </div>
        </div>
        
    )
}

export default Editor;