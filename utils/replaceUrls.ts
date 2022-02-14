function replaceURLs(message: string) {
  if (!message) return;

  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  let modMessage = message.toString().replace(urlRegex, function (url) {
    var hyperlink = url;
    if (!hyperlink.match("^https?://")) {
      hyperlink = "http://" + hyperlink;
    }
    return (
      '<a href="' +
      hyperlink +
      '" target="_blank" rel="noopener noreferrer" class="text-blue-500" >' +
      url +
      "</a>"
    );
  });

  return { __html: modMessage };
}

export default replaceURLs;
