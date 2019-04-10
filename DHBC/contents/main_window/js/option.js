'use strict';

// Electron modules.
const {remote} = require('electron');
// 3rd-parth modules.
// Goyo modules.
const goyoDialog = remote.require('./lib/goyo-dialog-utils');
const bookrackAccessor = remote.require('goyo-bookrack-accessor');
const lockFactory = remote.require('./lib/lock-manager/goyo-lock-manager');
const logger = remote.require('./lib/goyo-log')('album_backup_window');

let ctx = {
  constructionId: null,
  bookrackItemIds: null,
  knack: null,
};
let backupTree = null;

function initialize(constructionId, bookrackItemIds) {
  ctx.constructionId = parseInt(constructionId);
  let ids = bookrackItemIds.split(",");
  ctx.bookrackItemIds = [];
  ids.forEach((id)=>{
    if(!isNaN(id)){
      ctx.bookrackItemIds.push(parseInt(id));
    }
  })
}

$(document).ready(function () {
  let params = (new URL(document.location)).searchParams;
  initialize(params.get('constructionId'), params.get('albumId'));

  backupTree = new BackupTree(ctx);
  (async function(){
    let htmlTree = await backupTree.createHtml();
    ctx.knack = htmlTree.knack;
    $('#backup-tree').html(htmlTree.html);
    backupTree.bindJsTree('#backup-tree');
    $('.jstree-icon.jstree-ocl')[0].style.backgroundPositionY = "-11px";
    $('.jstree-icon.jstree-ocl')[0].style.borderTop = "7px solid white";
  })();

  $('#ok').click(async function(){
    let result = true;
    //check share construction
    result = await checkSharedLock(ctx.constructionId);
    if(!result){ return };

    //check share albums
    result = await checkSharedAlbumLock(ctx.constructionId, ctx.bookrackItemIds);
    if(!result){ return };

    //check exist album for backup
    let deliverableJson = backupTree.getJson('#backup-tree');
    if(deliverableJson && deliverableJson.albumList.length === 0){
      await goyoDialog.showWarningMessageDialog(remote.getCurrentWindow(), "アルバムのバックアップを作成",`アルバムを選択してください。`,'OK');
    }else{
      let extensionFile = $('#backup-type').find(":selected").val() === 'backup2020' ? 'abmx' : 'abm';
      dialog.exit({result:"OK", 
                  extention:extensionFile,
                  constructionId: deliverableJson.baseConstruction.constructionId,
                  albumIds:deliverableJson.albumList["0"].albumIdList});
    }
  });
});

// keyboard
document.getElementById("ok").addEventListener("focus", function () {
  deleteAllfocus();
  $("#ok").addClass('goyo-button-selected focus');
});
document.getElementById("cancel").addEventListener("focus", function () {
  deleteAllfocus();
  $("#cancel").addClass('goyo-button-selected focus');
});
document.getElementById("backup-type").addEventListener("focus", function () {
  deleteAllfocus();
  $("#ok").addClass('goyo-button-selected');
  $("#bor").addClass("borderSelect");
});
document.addEventListener('keydown', function (e) {
  var code = e.keyCode || e.which;
  var classCss = " .optionfocus { outline: none;border: dotted 1px #888;} .focus {position: relative;} .focus:before {content: '';position: absolute;top: 1px;bottom: 1px;right: 1px;left: 1px;border: dotted 1px #888;} .borderSelect{position: relative;} .borderSelect::after {position: absolute;content: '';top: 3px;left: 2px;border: 1px dotted #888;height: 18px;z-index: 1;width: 92%;}";
  if (code == 9 || code == 39 || code == 40) {
    $("style").remove();
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = classCss;
    document.body.appendChild(css);
  }
  if (code == 13 || code == 32) {
    e.preventDefault();
    $('.goyo-button-selected').click();
  }
  if (code == 27) {
    e.preventDefault();
    window.dialog.exit(null);
  }
});
$('#cancel').keydown(function (e) {
  var code = e.keyCode || e.which;
  if (e.shiftKey && e.keyCode == 9) {
    e.preventDefault();
    $('#ok').focus();
  }
  if (!e.shiftKey) {
    if (code == 9 || code == 39 || code == 40) {
      deleteAllfocus();
      e.preventDefault();
      $('#backup-type').focus();
    }
    if (code == 37 || code == 38) {
      deleteAllfocus();
      e.preventDefault();
      $('#ok').focus();
    }
  }
});
$('#backup-type').keydown(function (e) {
  var code = e.keyCode || e.which;
  if (e.shiftKey && e.keyCode == 9) {
    e.preventDefault();
    $('#cancel').focus();
  }
  if (!e.shiftKey) {
    if (code == 9) {
      deleteAllfocus();
      e.preventDefault();
      $('#ok').focus();
    }
  }
});
$('#ok').keydown(function (e) {
  var code = e.keyCode || e.which;
  if (e.shiftKey && e.keyCode == 9) {
    e.preventDefault();
    $('#backup-type').focus();
  }
  if (!e.shiftKey) {
    if (code == 39 || code == 40) {
      deleteAllfocus();
      e.preventDefault();
      $('#cancel').focus();
    }
  }
});
function deleteAllfocus() {
  $(".borderSelect").removeClass('borderSelect');
  $(".focus").removeClass('focus');
  $(".inputFocus").removeClass('inputFocus');
  $(".optionfocus").removeClass('optionfocus');
  $(".goyo-button-selected").removeClass('goyo-button-selected');
}
async function checkSharedLock(constructionId) {
  try {
    let lockManager = await lockFactory.makeLockManagerByConstructionId(parseInt(constructionId));
    let others = await lockManager.existSharedLockOwners();
    logger.debug(`constructionId=${constructionId}, checkSharedLock=${others}`);
    if (others) {
      await goyoDialog.showConstructionShareLockBusyDialog(
        remote.getCurrentWindow(), others.length);
      return false;
    }
    return true;
  } catch (e) {
    logger.error('Failed to lockManager', e);
    return false;
  }
}
async function checkSharedAlbumLock(constructionId, targetAlbumIds) {
  let lockManager = null;
  let lockedAlbumIds = [];
  var unLockAlbums = async function() {
    for (let albumId of lockedAlbumIds) {
      await lockManager.lockAlbum(albumId, false)
        .catch((e) => { logger.error('Failed to lockManager.lockAlbum(unlock)', e) });
    }
  }
  try {
    // lock album
    lockManager = await lockFactory.makeLockManagerByConstructionId(constructionId);
    let result = true;
    for(let i=0; i < targetAlbumIds.length; i++){
      result = await lockManager.lockAlbum(targetAlbumIds[i], true);
      if(!result){
        await unLockAlbums();
        await goyoDialog.showAlbumLockBusyDialog(remote.getCurrentWindow());
        return false;
      }else {
        lockedAlbumIds.push(targetAlbumIds[i]);
      }
    }
    return true;
  } catch (e) {
    await unLockAlbums();
    logger.error('Failed to lockManager', e);
    return false;
  }
}