import React from 'react';
import { emptyContentSwitcher } from "../../../App.model";

export const EmptyContent = () => {
  return (
    <div className="content">
      <h2 className="content__title">Open a note or create new one</h2>
      <button onClick={emptyContentSwitcher} className="content__btn">Create a note</button>
    </div>
  )
}