let util = {

};
util.title = function (title) {
    title = title ? title + ' - 管理系统' : 'iView project';
    window.document.title = title;
};

export default util;