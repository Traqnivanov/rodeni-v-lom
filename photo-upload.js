// Родени в Лом — общ механизъм за смаляване и качване на снимки.
// Ползва се навсякъде в сайта, където потрябва качване на снимка (не само профилни).

window.RodeniPhoto = (function(){
  "use strict";

  var MAX_DIMENSION = 480;   // пиксели по дългата страна - достатъчно за ясна малка снимка
  var JPEG_QUALITY = 0.78;   // баланс между яснота и размер на файла

  // Смалява файл-изображение до Blob (JPEG), без да качва никъде.
  function compressImage(file){
    return new Promise(function(resolve, reject){
      var img = new Image();
      var reader = new FileReader();
      reader.onerror = function(){ reject(new Error('Неуспешно четене на файла.')); };
      reader.onload = function(){
        img.onerror = function(){ reject(new Error('Файлът не изглежда като снимка.')); };
        img.onload = function(){
          var w = img.naturalWidth, h = img.naturalHeight;
          var scale = Math.min(1, MAX_DIMENSION / Math.max(w, h));
          var outW = Math.round(w * scale);
          var outH = Math.round(h * scale);

          var canvas = document.createElement('canvas');
          canvas.width = outW;
          canvas.height = outH;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, outW, outH);

          canvas.toBlob(function(blob){
            if (!blob){ reject(new Error('Неуспешно преобразуване на снимката.')); return; }
            resolve(blob);
          }, 'image/jpeg', JPEG_QUALITY);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Смалява и качва снимка в bucket "photos", в папка на текущия потребител.
  // sb - Supabase клиент; file - File от <input type=file>; userId - auth.uid().
  // Връща публичния адрес на качената снимка.
  async function uploadUserPhoto(sb, file, userId){
    if (!file) throw new Error('Няма избрана снимка.');
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)){
      throw new Error('Позволени са само снимки (JPEG, PNG, WebP).');
    }
    var blob = await compressImage(file);
    var path = userId + '/' + Date.now() + '.jpg';

    var uploadRes = await sb.storage.from('photos').upload(path, blob, {
      contentType: 'image/jpeg',
      upsert: false
    });
    if (uploadRes.error) throw uploadRes.error;

    var urlRes = sb.storage.from('photos').getPublicUrl(path);
    return urlRes.data.publicUrl;
  }

  return {
    compressImage: compressImage,
    uploadUserPhoto: uploadUserPhoto
  };
})();
