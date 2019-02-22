'use strict';

var winControl = require('./lib/windowControl');
var electron = require('electron');
var app = electron.app;
var ipcMain = electron.ipcMain;
var dialog = electron.dialog;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', function() {
	winControl.showMainWindow();
	winControl.showSidemenuWindow();
});


ipcMain.on('request-new-window', function() {
	console.log('main process: create child window.');
	winControl.showAutocloseWindow();
});