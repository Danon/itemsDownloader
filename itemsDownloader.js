function itemToJson(p) {
  let cadLink = p.querySelector(".cad-link a");
  let cad;
  if (cadLink) {
    cad = {
      itemNumber: cadLink.dataset.itemnumber,
      iFrameUrl: cadLink.dataset.iframeurl,
    };
  } else {
    cad = {}
  }
  return {
    img: p.querySelector(".image .image-container a img").src,
    subtitle: p.querySelector(".description .subtitle a").innerText,
    link: p.querySelector(".description .subtitle a").href,
    parameters: Array.from(p.querySelectorAll(".table tr")).map(tr => {
      return {
        key: tr.querySelector("th").innerText,
        value: tr.querySelector("td").innerText,
      };
    }),
    cad: cad,
    pdfDownload: p.querySelector(".pdf-link a").onclick.toString()
  };
}

function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  var a = document.createElement("a"), url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

const items = Array.from(document.getElementsByClassName("item")).map(item => itemToJson(item));
download(JSON.stringify(items), 'items.json', 'application/json');