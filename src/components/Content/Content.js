import React from 'react';
import './Content.scss';
import { EmptyContent } from "./EmptyContent/EmptyContent";
import { appStore } from "../../App.model";
import { useStore } from "effector-react";
import { NoteContent } from "./NoteContent/NoteContent";

export const Content = () => {
  const isEmptyContent = useStore(appStore).isEmptyContent;

  return isEmptyContent ? <EmptyContent /> : <NoteContent />
} 