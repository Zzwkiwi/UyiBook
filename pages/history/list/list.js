const app = getApp()
const config = require("../../../config.js");
var isbnUrl = 'https://api.zuk.pw/situ/book/isbn/'
Page({

      /**
       * 页面的初始数据
       */
      data: {
            list: [],
            page: 1,
            scrollTop: 0,
            nomore: false,
            isbn: 0,
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            // wx.showLoading({
            //       title: '加载中',e
            // })
            this.getList();
      },
      getList() {
            let that = this;
            var seller_id = "1";
            wx.request({
                  url: "http://uyibook.top:8605/OrderInfo/getOrderInfo/sellerId/" + seller_id,
                  success: function (res) {
                        wx.hideLoading();
                        wx.stopPullDownRefresh(); //暂停刷新动作
                        //加载进度
                        console.log("data:", res);
                        that.setData({
                              list: res.data.data,
                              // .filter((p) => {
                              //       return p.transaction_status == 0 //按查询状态为未交易的订单
                              // }),
                              // all: res.data.data,
                              isbn : res.data.data[0].bookIsbn,
                              nomore: false,
                              page: 0,
                        });
                        that.getBookInfo();
                        // that.setProcessIcon();
                       
                        console.log("list:", that.data.list);
                        console.log("isbn:", that.data.isbn);
                  },
                  fail: function (res) {
                        console.log(res);
                  }
            })
      },
      //获取书籍信息
      getBookInfo: function () {
            var _this = this;
            var url = isbnUrl + _this.data.isbn;
            wx.request({
                  url: url,
                  success: function (res) {
                        _this.setData({
                              bookinfo: res.data.data
                        })
                        console.log(res);
                  }
            })
      },
      // getList() {
      //       let that = this;
      //       db.collection('publish').where({
      //             _openid: app.openid
      //       }).orderBy('creat', 'desc').limit(20).get({
      //             success: function(res) {
      //                   wx.hideLoading();
      //                   wx.stopPullDownRefresh(); //暂停刷新动作
      //                   that.setData({
      //                         list: res.data,
      //                         nomore: false,
      //                         page: 0,
      //                   })
      //                   console.log(res.data)
      //             }
      //       })
      // },
      // //删除
      // del(e) {
      //       let that = this;
      //       let del = e.currentTarget.dataset.del;
      //       wx.showModal({
      //             title: '温馨提示',
      //             content: '您确定要删除此条订单吗？',
      //             success(res) {
      //                   if (res.confirm) {
      //                         wx.showLoading({
      //                               title: '正在删除'
      //                         })
      //                         db.collection('publish').doc(del._id).remove({
      //                               success() {
      //                                     wx.hideLoading();
      //                                     wx.showToast({
      //                                           title: '成功删除',
      //                                     })
      //                                     that.getList();
      //                               },
      //                               fail() {
      //                                     wx.hideLoading();
      //                                     wx.showToast({
      //                                           title: '删除失败',
      //                                           icon: 'none'
      //                                     })
      //                               }
      //                         })
      //                   }
      //             }
      //       })
      // },
      // //查看详情
      // detail(e) {
      //       let that = this;
      //       let detail = e.currentTarget.dataset.detail;
      //       if (detail.status == 0) {
      //             wx.navigateTo({
      //                   url: '/pages/detail/detail?scene=' + detail._id,
      //             })
      //       }
      //       if (detail.status == 1) {
      //             wx.navigateTo({
      //                   url: '/pages/sell/detail/detail?id=' + detail._id,
      //             })
      //       }
      // },
      // //下拉刷新
      // onPullDownRefresh() {
      //       this.getList();
      // },
      // //至顶
      // gotop() {
      //       wx.pageScrollTo({
      //             scrollTop: 0
      //       })
      // },
      // //监测屏幕滚动
      // onPageScroll: function(e) {
      //       this.setData({
      //             scrollTop: parseInt((e.scrollTop) * wx.getSystemInfoSync().pixelRatio)
      //       })
      // },
      // onReachBottom() {
      //       this.more();
      // },
      // //加载更多
      // more() {
      //       let that = this;
      //       if (that.data.nomore || that.data.list.length < 20) {
      //             return false
      //       }
      //       let page = that.data.page + 1;
      //       db.collection('publish').where({
      //             _openid: app.openid
      //       }).orderBy('creat', 'desc').skip(page * 20).limit(20).get({
      //             success: function(res) {
      //                   if (res.data.length == 0) {
      //                         that.setData({
      //                               nomore: true
      //                         })
      //                         return false;
      //                   }
      //                   if (res.data.length < 20) {
      //                         that.setData({
      //                               nomore: true
      //                         })
      //                   }
      //                   that.setData({
      //                         page: page,
      //                         list: that.data.list.concat(res.data)
      //                   })
      //             },
      //             fail() {
      //                   wx.showToast({
      //                         title: '获取失败',
      //                         icon: 'none'
      //                   })
      //             }
      //       })
      // },
})