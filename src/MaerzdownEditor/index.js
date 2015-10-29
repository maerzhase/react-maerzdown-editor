import React, { Component, PropTypes } from 'react';
import MarkdownUtil from '../utils/MarkdownUtils';

import styles from './style.js';

export default class MaerzdownEditor extends React.Component {

  constructor(props){
    super(props);
    this.state = {content:"",fullscreen:0};
  
    this._toggleFullscreen = this._toggleFullscreen.bind(this);
    this._handleTextareaChange = this._handleTextareaChange.bind(this);
    this._handleAppendToText = this._handleAppendToText.bind(this);
    this._handleTextEmphasize = this._handleTextEmphasize.bind(this);
  }

  _handleTextareaChange(e){
    let val = e.target.value;
    this.setState({content:val});
  }

  _toggleFullscreen(e){
    e.preventDefault();
    this.state.fullscreen == 1 ? this.setState({fullscreen:0}) : this.setState({fullscreen:1});
  }

  _handleAppendToText(e){
    let textarea = this.refs.textarea.getDOMNode(),
        text = textarea.value,
        btnVal = e.target.value,
        defaultValue = "default",
        newText = text + "\n" + btnVal + defaultValue;

        textarea.value = newText;
        textarea.selectionStart = text.length + (btnVal.length + 1);
        textarea.selectionEnd = newText.length;
        this.setState({content:newText});
  }

  _handleTextEmphasize(e){
    let textarea = this.refs.textarea.getDOMNode(),
        text = textarea.value,
        btnVal = e.target.value,
        defaultValue = "default",
        selectionStart = textarea.selectionStart,
        selectionEnd = textarea.selectionEnd,
        singsBefore = text.substring(selectionStart-btnVal.length,selectionStart),
        singsAfter = text.substring(selectionEnd,selectionEnd+btnVal.length);


    if(singsAfter == singsBefore && singsBefore == btnVal && singsAfter == btnVal){
      let textBefore = text.substring(0, selectionStart-btnVal.length),
          selectedText = text.substring(selectionStart, selectionEnd),
          textAfter = text.substring(selectionEnd+btnVal.length, text.length),
          newText = (textBefore.length > 0 ? (textBefore + " ") : "") + selectedText + (textAfter.length > 0 ? (" " + textAfter) : "");

        textarea.value = newText;
        textarea.selectionStart = selectionStart - (btnVal.length);
        textarea.selectionEnd = selectionEnd - (btnVal.length);
        this.setState({content:newText});

    }else{
      //if nothing selected
      if(selectionStart == selectionEnd){
          let textBefore = text.substring(0,  selectionStart ),
              textAfter  = text.substring( selectionStart, text.length ),
              newText = textBefore + btnVal + defaultValue + btnVal + textAfter;

          textarea.value = newText;
          textarea.selectionStart = selectionStart + (btnVal.length);
          textarea.selectionEnd = selectionStart + (btnVal.length + defaultValue.length);
          this.setState({content:newText});   

      }else{
          let textBefore = text.substring(0,  selectionStart),
              selectedText = text.substring(selectionStart,selectionEnd),
              textAfter  = text.substring( selectionEnd, text.length ),
              newText = textBefore + btnVal + selectedText + btnVal + textAfter;

          textarea.value = newText;
          textarea.selectionStart = selectionStart + (btnVal.length);
          textarea.selectionEnd = selectionStart + (btnVal.length + selectedText.length);
          this.setState({content:newText});
      }
    }
  }

  render() {
    let fullscreen = this.state.fullscreen == 1 ? styles.fullscreen : null;

    return(  
      <div className="maerzdownEditor" style={fullscreen}>
        <div>
          <button onClick={this._toggleFullscreen}>Fullscreen</button>
          <button onClick={this._handleAppendToText} value="# ">#</button>
          <button onClick={this._handleAppendToText} value="## ">##</button>
          <button onClick={this._handleAppendToText} value="### ">###</button>
          <button onClick={this._handleAppendToText} value="#### ">####</button>
          <button onClick={this._handleTextEmphasize} value="*">*</button>
          <button onClick={this._handleTextEmphasize} value="**">**</button>
          <button onClick={this._handleTextEmphasize} value="++">++</button>
          <button onClick={this._handleTextEmphasize} value="~~">~~</button>
          <button onClick={this._handleTextEmphasize} value="```">CODE</button>
        </div>
        <div>
          <div className="editor" ref="editor" style={styles.editor}>
            <textarea ref="textarea" style={styles.textarea} onChange={this._handleTextareaChange}/>
          </div>
          <div  className="preview" 
                ref="preview" 
                style={styles.preview} 
                dangerouslySetInnerHTML={MarkdownUtil.renderDangerouslyInnerHtml(this.state.content)}/>
        </div>
      </div>
    );
  }
}
