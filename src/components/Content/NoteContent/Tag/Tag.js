import React from 'react';
import { removeTagsHandler } from "../../../../utils/removeTagsHandler";

export const Tag = (props) => {
  return (
    <div className="content__bottom-tag">
      #{props.tag}
      <span
        onClick={() => removeTagsHandler({...props})}
          className='content__bottom-tag-delete'/>
    </div>
  )
}