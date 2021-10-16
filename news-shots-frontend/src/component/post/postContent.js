import React, {useState, useEffect} from 'react';
import {Link, withRouter, useLocation} from 'react-router-dom';

import { convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const PostContent = ({content}) => {

    const [contentState, setContentState] = useState(convertFromRaw(JSON.parse(content)));
    // console.log(contentState);
    // console.log(draftToHtml(convertToRaw(contentState)));

    return (
        <div dangerouslySetInnerHTML= {{ __html: `${draftToHtml(convertToRaw(contentState))}` }} />
    )
}

export default PostContent;
