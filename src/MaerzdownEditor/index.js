import React, { Component, PropTypes } from 'react';
import MarkdownUtil from '../utils/MarkdownUtils';
import { ButtonToolbar, Button, Col, Input, Row, Modal, Grid } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


import styles from './style.css';



export default class MaerzdownEditor extends React.Component {

  constructor(props){
    super(props);

    this.state = {fullscreen:false};

    this._onChange = this._onChange.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleInsertAtEnd = this._handleInsertAtEnd.bind(this);
    this._handleInsertEmphasize = this._handleInsertEmphasize.bind(this);
    this._handleInsertLink = this._handleInsertLink.bind(this);
    this._handleInsertImage = this._handleInsertImage.bind(this);
    this._handleShowEditor = this._handleShowEditor.bind(this);

    this._closeFullscreen = this._closeFullscreen.bind(this);
    this._closeFullscreen = this._closeFullscreen.bind(this);
    this._openFullscreen = this._openFullscreen.bind(this);

  }

  _handleShowEditor(e){
    let thisDOMNode = React.findDOMNode(this),
        editorCol = $('.editor-col', thisDOMNode),
        previewCol = $('.preview-col', thisDOMNode),
        toolbar = $('.toolbar', thisDOMNode);

        if($(editorCol).hasClass('active')){
           $(editorCol).removeClass('active').hide(0);
           $(toolbar).removeClass('active').hide(0);
        }else{
          $('.editor-col.active').removeClass('active').hide(0);
          $('.toolbar.active').removeClass('active').hide(0);
          $('.preview-col.active').addClass('col-xs-12').removeClass('col-xs-6 active');
          $(editorCol).addClass('active').show(0);
          $(toolbar).addClass('active').show(0);
        }

    if(!$(previewCol).hasClass('active')){
      $(previewCol).addClass('col-xs-6 active').removeClass('col-xs-12');
    }else{
      $(previewCol).addClass('col-xs-12').removeClass('col-xs-6 active');
    }
    
  }

  _closeFullscreen() {
    this.setState({fullscreen: false});
    let thisDOMNode = React.findDOMNode(this);
    $('body').css({'overflow':'auto'});
    $('.fullscreen-editor', thisDOMNode).hide();
    let text = $('textarea',$('.fullscreen-editor',thisDOMNode)).val();
    $('.main-nav').css({'top': '0'});

  }

  _openFullscreen() {
    this.setState({fullscreen: true});

    let thisDOMNode = React.findDOMNode(this);
    let text = $('textarea',$('.editor',thisDOMNode)).val();
    $('body').css({'overflow':'hidden'});
    $('.main-nav').css({'top': '-70px'});

    $('.fullscreen-editor',thisDOMNode).show();
  }

  _onChange(e){
    let text = $(e.target).val();
    let thisDOMNode = React.findDOMNode(this);
    let md = MarkdownUtil.renderDangerouslyInnerHtml(text).__html;
    $('.markdown-preview', thisDOMNode).html(md);

    if(this.state.fullscreen){
      $('textarea', $('.editor',thisDOMNode)).val(text);
    }else{
      $('textarea', $('.fullscreen-editor',thisDOMNode)).val(text);
    }

  }

  _handleInsertAtEnd(e){
    let thisDOMNode = React.findDOMNode(this),
        textarea = this.state.fullscreen ? $('textarea',$('.fullscreen-editor', thisDOMNode)) : $('textarea',$('.editor', thisDOMNode)) ,
        text = $(textarea).val(),
        btnVal = $(e.target)[0].tagName == "I" ? $(e.target).closest('button').val() + " " : $(e.target).val() + " ",
        defaultValue = "new headline",
        newText = text +'\n' + btnVal + defaultValue,
        md = MarkdownUtil.renderDangerouslyInnerHtml(newText).__html;

    $(textarea).val(newText);
    $('.markdown-preview', thisDOMNode).html(md);

    let newSelectionStart = $(textarea).prop('selectionStart',text.length + (btnVal.length + 1));
    let newSelectionEnd = $(textarea).prop('selectionEnd', newText.length);

  }

  _handleInsertEmphasize(e){
    let thisDOMNode = React.findDOMNode(this),
        textarea = this.state.fullscreen ? $('textarea',$('.fullscreen-editor', thisDOMNode)) : $('textarea',$('.editor', thisDOMNode)) ,
        text = $(textarea).val(),
        btnVal = $(e.target)[0].tagName == "I" ? $(e.target).closest('button').val() : $(e.target).val(),
        defaultValue = "text",
        selectionStart = $(textarea).prop('selectionStart'),
        selectionEnd = $(textarea).prop('selectionEnd');
    
    //if nothing selected
    if(selectionStart == selectionEnd){
        let textBefore = text.substring(0,  selectionStart ),
            textAfter  = text.substring( selectionStart, text.length ),
            newText = textBefore + btnVal + defaultValue + btnVal + textAfter,
            md = MarkdownUtil.renderDangerouslyInnerHtml(newText).__html;

        $(textarea).val(newText);
        $('.markdown-preview', thisDOMNode).html(md);

        let newSelectionStart = $(textarea).prop('selectionStart',selectionStart + (btnVal.length));
        let newSelectionEnd = $(textarea).prop('selectionEnd', selectionStart + (btnVal.length + defaultValue.length));
    }else{
        let textBefore = text.substring(0,  selectionStart ),
            selectedText = text.substring(selectionStart,selectionEnd),
            textAfter  = text.substring( selectionEnd, text.length ),
            newText = textBefore + btnVal + selectedText + btnVal + textAfter,
            md = MarkdownUtil.renderDangerouslyInnerHtml(newText).__html;

        $(textarea).val(newText);
        $('.markdown-preview', thisDOMNode).html(md);

        let newSelectionStart = $(textarea).prop('selectionStart',selectionStart + (btnVal.length));
        let newSelectionEnd = $(textarea).prop('selectionEnd', selectionStart + (btnVal.length + selectedText.length));
    }
  }

  _handleInsertLink(e){
    let thisDOMNode = React.findDOMNode(this),
        textarea = this.state.fullscreen ? $('textarea',$('.fullscreen-editor', thisDOMNode)) : $('textarea',$('.editor', thisDOMNode)) ,
        text = $(textarea).val(),
        btnVal = $(e.target)[0].tagName == "I" ? $(e.target).closest('button').val() : $(e.target).val(),
        selectionStart = $(textarea).prop('selectionStart'),
        selectionEnd = $(textarea).prop('selectionEnd');

    if(selectionStart == selectionEnd){
      let textBefore = text.substring(0,  selectionStart ),
          textAfter  = text.substring(selectionStart, text.length ),
          defaultValue = "link text",
          newText = textBefore +"[" +defaultValue+"](http://please_insert_url)" + textAfter,
          md = MarkdownUtil.renderDangerouslyInnerHtml(newText).__html;

      $(textarea).val(newText);
      $('.markdown-preview', thisDOMNode).html(md);

      let newSelectionStart = $(textarea).prop('selectionStart',selectionStart + 1);
      let newSelectionEnd = $(textarea).prop('selectionEnd', selectionStart + (defaultValue.length + 1));
    }else{
        let textBefore = text.substring(0,  selectionStart ),
            selectedText = text.substring(selectionStart,selectionEnd),
            textAfter  = text.substring( selectionEnd, text.length ),
            defaultUrl = "http://please_insert_url",
            newText = textBefore + "[" + selectedText + "]("+defaultUrl+")" + textAfter,
            md = MarkdownUtil.renderDangerouslyInnerHtml(newText).__html;

        $(textarea).val(newText);
        $('.markdown-preview', thisDOMNode).html(md);

      let newSelectionStart = $(textarea).prop('selectionStart',selectionStart + 3 + selectedText.length);
      let newSelectionEnd = $(textarea).prop('selectionEnd', selectionStart + 3 + selectedText.length + (defaultUrl.length));
    }
  }

  _handleInsertImage(e){
    let thisDOMNode = React.findDOMNode(this),
        textarea = this.state.fullscreen ? $('textarea',$('.fullscreen-editor', thisDOMNode)) : $('textarea',$('.editor', thisDOMNode)) ,
        text = $(textarea).val(),
        btnVal = $(e.target)[0].tagName == "I" ? $(e.target).closest('button').val() + " " : $(e.target).val() + " ",
        defaultValue = "alt text",
        defaultUrl = "https://octodex.github.com/images/stormtroopocat.jpg",
        newText = text +'\n' + "![" + defaultValue +  "](" +defaultUrl+ ")",
        md = MarkdownUtil.renderDangerouslyInnerHtml(newText).__html;

    $(textarea).val(newText);
    $('.markdown-preview', thisDOMNode).html(md);

    let newSelectionStart = $(textarea).prop('selectionStart',text.length + (defaultValue.length + 5));
    let newSelectionEnd = $(textarea).prop('selectionEnd',text.length + (defaultValue.length + 5) +defaultUrl.length);
  }



  _handleScroll(e){
    let thisDOMNode = React.findDOMNode(this),
        textarea = this.state.fullscreen ? $('textarea',$('.fullscreen-editor', thisDOMNode)) : $('textarea',$('.editor', thisDOMNode)) ,
        preview = $('.markdown-preview',thisDOMNode),
        textareaHeight = $(textarea)[0].scrollHeight,
        previewHeight = $(preview)[0].scrollHeight,
        editorHeight = $(preview).innerHeight();

    let maxTextareaScroll = textareaHeight - editorHeight;
    let maxPreviewHeight = previewHeight - editorHeight;

    let scrollVal1 = $(textarea).scrollTop();
    let scrollVal2 = $(preview).scrollTop();

    //console.log(textareaHeight, previewHeight, scrollVal1,scrollVal2);

    let scrollVal = (scrollVal1 - 0) / (maxTextareaScroll - 0) * (maxPreviewHeight - 0) + 0;

    $(preview).prop('scrollTop', scrollVal);

  }

  render() {
    console.log(styles);

        return(  
          <Grid className={styles.markdownEditor}>
            <div className="editor">
              <Row className="full">
                <Col xs={12}>
                  <label className="control-label">{this.props.label}</label> 
                </Col>
              </Row>
              <Row className="">
                <Col className="toolbar" xs={12}>
                  <ButtonToolbar>
                    <Button value="" onClick={this._handleInsertLink}><FontAwesome name="link"/></Button>
                    <Button value="" onClick={this._handleInsertImage}><i className="fa fa-picture-o"></i></Button>

                    <Button value="#" onClick={this._handleInsertAtEnd}><i className="fa fa-header"></i></Button>
                    <Button value="##" onClick={this._handleInsertAtEnd}><i className="fa fa-header"></i></Button>
                    <Button value="###" onClick={this._handleInsertAtEnd}><i className="fa fa-header"></i></Button>
                    <Button value="####" onClick={this._handleInsertAtEnd}><i className="fa fa-header"></i></Button>
                    
                    <Button value="**" onClick={this._handleInsertEmphasize}><i className="fa fa-bold"></i></Button>
                    <Button value="*" onClick={this._handleInsertEmphasize}><i className="fa fa-italic"></i></Button>
                    <Button value="++" onClick={this._handleInsertEmphasize}><i className="fa fa-underline"></i></Button>
                    <Button value="~~" onClick={this._handleInsertEmphasize}><i className="fa fa-strikethrough"></i></Button>
                    
                    <Button value=">" onClick={this._handleInsertAtEnd}><i className="fa fa-quote-right"></i></Button>
                    <Button value="-" onClick={this._handleInsertAtEnd}><i className="fa fa-list-ul"></i></Button>
                    <Button value="1." onClick={this._handleInsertAtEnd}><i className="fa fa-list-ol"></i></Button>
                    <Button value="```" onClick={this._handleInsertEmphasize}><i className="fa fa-code"></i></Button>

                    <Button value="" onClick={this._openFullscreen}><i className="fa fa-arrows-alt"></i></Button>

                  </ButtonToolbar>
                </Col>

              </Row>

              <Row className=""> 

                <Col className="editor-col" xs={6}>
                 <Input
                  className={this.props.name}
                  type='textarea'
                  placeholder={ "placeholder" }
                  data-key={ "maerzdown-editor" }
                  defaultValue={ "" }
                  onChange={this._onChange}
                  onScroll={this._handleScroll} />

                </Col>
                <Col className="preview-col" onClick={this._handleShowEditor} xs={6}>
                  <div className="markdown-preview" dangerouslySetInnerHTML={ MarkdownUtil.renderDangerouslyInnerHtml("") }>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="fullscreen-editor">
              <Row >
                <Col xs={12}>
                  <Button onClick={this._closeFullscreen}> Close </Button>
                  <hr> </hr>
                </Col>
              </Row>
              <Row >
                <Col className="toolbar" xs={12}>
                  <ButtonToolbar>  
                    <Button value="" onClick={this._handleInsertLink}><i className="fa fa-link"></i></Button>
                    <Button value="" onClick={this._handleInsertImage}><i className="fa fa-picture-o"></i></Button>

                    <Button value="#" onClick={this._handleInsertAtEnd}><i className="fa fa-header"></i></Button>
                    <Button value="##" onClick={this._handleInsertAtEnd}><i className="fa fa-header"></i></Button>
                    <Button value="###" onClick={this._handleInsertAtEnd}><i className="fa fa-header"></i></Button>
                    <Button value="####" onClick={this._handleInsertAtEnd}><i className="fa fa-header"></i></Button>
                    
                    <Button value="**" onClick={this._handleInsertEmphasize}><i className="fa fa-bold"></i></Button>
                    <Button value="*" onClick={this._handleInsertEmphasize}><i className="fa fa-italic"></i></Button>
                    <Button value="++" onClick={this._handleInsertEmphasize}><i className="fa fa-underline"></i></Button>
                    <Button value="~~" onClick={this._handleInsertEmphasize}><i className="fa fa-strikethrough"></i></Button>
                    
                    <Button value=">" onClick={this._handleInsertAtEnd}><i className="fa fa-quote-right"></i></Button>
                    <Button value="-" onClick={this._handleInsertAtEnd}><i className="fa fa-list-ul"></i></Button>
                    <Button value="1." onClick={this._handleInsertAtEnd}><i className="fa fa-list-ol"></i></Button>
                    <Button value="```" onClick={this._handleInsertEmphasize}><i className="fa fa-code"></i></Button>

                  </ButtonToolbar>
                </Col>

              </Row>

              <Row className="editor-row"> 

                <Col className="editor-col" xs={6}>
                 <Input
                  className={this.props.name}
                  type='textarea'
                  placeholder={ "placeholder" }
                  data-key={ "maerzdown-editor" }
                  defaultValue={ "" }
                  onChange={this._onChange}
                  onScroll={this._handleScroll} />

                </Col>
                <Col className="preview-col" xs={6}>
                  <div className="markdown-preview" dangerouslySetInnerHTML={ MarkdownUtil.renderDangerouslyInnerHtml("") }>
                  </div>
                </Col>
              </Row>

            </div>

          </Grid>
        );
  }
}
