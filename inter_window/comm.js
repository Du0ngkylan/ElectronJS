const {BrowserWindow} = require('electron');

module.exports = {

  subWindow: null,
  data: null,

  // called from mainWindow.
  openSubWindow(data_) {
    this.subWindow = new BrowserWindow({ width:400, height:400, show: true });
    this.subWindow.loadURL('file://' + __dirname + '/subwin.html');
		//this.subWindow.setMenu(null);
    this.data = data_;
    console.log('data', this.data);
    /*
     *  data_ = {
     *    text: _STRING_,
     *    callback: _FUNCTION_,
     *  }
     */
  },

  // called from subWindow.
  getData() {
    return this.data;
  }

};

