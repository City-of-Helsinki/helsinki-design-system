function getBrowsedFiles() {
  return fileListFromArray([
      mockFileCreator({ name: 'file-one.txt', type: 'text/plain', size: 234 * 1000 }),
      mockFileCreator({ name: 'file-two.txt', type: 'text/plain', size: 56 * 1000 }),
  ]);
}

function mockFileCreator({
  name = 'file.txt',
  size = 1024,
  type = 'plain/txt',
  lastModified = new Date(),
  webkitRelativePath = '',
}) {
  const blob = new Blob(['a'.repeat(size)], { type });

  blob['lastModifiedDate'] = lastModified;

  return new File([blob], name, { type, webkitRelativePath });
}

function fileListFromArray(files) {
  const flMock = files.reduce(
      (accumulator, curr, i) => {
          accumulator[i] = curr;
          return accumulator;
      },
      { length: files.length },
  );

  flMock.item = function(index) {
      return this[index];
  }.bind(flMock);
  return flMock;
}

class FileList {
  constructor() {

  }
}

class DataTransfer {
  constructor() {
    // this.fileList = [{ name: 'Example File' }, { name: 'Another File' }];
    // this.fileList = fileListFromArray([])

    // this.data = { dragX: "", dragY: "" };
    // this.dropEffect = "none";
    // this.effectAllowed = "all";
    this.files =  new FileList() // getBrowsedFiles(); // [{ name: 'Example File' }, { name: 'Another File' }]; 
    // this.img = "";
    this.items = [];
    this.items.add = (file) => { }
    // this.types = [];
    // this.xOffset = 0;
    // this.yOffset = 0;
  }
  // clearData() {
  //   this.data = {};
  // }
  // getData(format) {
  //   return this.data[format];
  // }
  // setData(format, data) {
  //   this.data[format] = data;
  // }
  // setDragImage(img, xOffset, yOffset) {
  //   this.img = img;
  //   this.xOffset = xOffset;
  //   this.yOffset = yOffset;
  // }

}

global.ResizeObserver =
  global.ResizeObserver ||
  function (callBack) {
    let observer = new MutationObserver(callBack);
    return {
      disconnect: () => {
        observer.disconnect();
        observer = undefined;
      },
      observe: (el) => {
        observer.observe(el, { childList: true, attributes: true, subtree: true });
      },
      unobserve: () => observer.unobserve(),
    };
  };

global.DataTransfer = DataTransfer