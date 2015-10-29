var StyleSheet = require('react-style');

var styles = StyleSheet.create({

    fullscreen:{
      display:'block',
      position:'fixed',
      width:'100%',
      height:'100%',
      left:'0px',
      top:'0px',
      padding:'20px',
    },

    editor: {
      display:'inline-block',
      position:'relative',
      width:'50%',
    },

    textarea:{
      maxWidth:'100%',
      width:'100%',
      resize: 'vertical',
    },

    preview:{
      display:'inline-block', 
      position:'relative',
      width:'50%',
      verticalAlign:'top',
      padding:'0 0 0 10px',
    },


});

module.exports = styles;
