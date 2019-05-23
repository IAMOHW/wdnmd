import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Upload } from 'antd';
import CosCloud from 'cos-js-sdk-v5';

const config = {
  Bucket: 'boomtube-1253483604',
  Region: 'ap-beijing',
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

@connect(({ home }) => ({ home }))
class BaseForm extends Component {
  state = { coverLoading: false, addrLoading: false, addrImage: '', coverImage: '' };

  componentDidMount() {
    // To disabled submit button at the beginning.
  }

  handleSubmit = e => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const {
        VideoTitle,
        VideoDesc,
        VideoContent,
        VideoImg: tempImg,
        VideoAddr: tempAddr,
      } = values;
      const VideoImg = `https://boomtube-1253483604.cos.ap-beijing.myqcloud.com/${
        tempImg.file.name
      }`;
      const VideoAddr = `https://boomtube-1253483604.cos.ap-beijing.myqcloud.com/${
        tempAddr.file.name
      }`;
      if (!err) {
        dispatch({
          type: 'video/create',
          payload: {
            VideoTitle,
            VideoDesc,
            VideoContent,
            VideoImg,
            VideoAddr,
          },
        });
      }
    });
  };

  uploadFile = ({ onSuccess, onError, file }) => {
    const { dispatch } = this.props;
    const cos = new CosCloud({
      getAuthorization(options, callback) {
        // 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/edit/master/scope.md
        dispatch({
          type: 'video/getToken',
        }).then(data => {
          callback({
            TmpSecretId: data.credentials.tmpSecretId,
            TmpSecretKey: data.credentials.tmpSecretKey,
            XCosSecurityToken: data.credentials.sessionToken, // 需要提供把 sessionToken 传给
            ExpiredTime: data.expiredTime,
            ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
          });
        });
      },
    });
    cos.putObject(
      {
        Bucket: config.Bucket /* 必须 */,
        Region: config.Region /* 必须 */,
        Key: file.name /* 必须 */,
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress(progressData) {
          console.log(JSON.stringify(progressData));
        },
      },
      (err, data) => {
        if (err) {
          console.error(err);
          onError(err);
        } else {
          console.log(data);
          onSuccess(null, file);
        }
      }
    );
  };

  handleCoverChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ coverLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          coverImage: imageUrl,
          coverLoading: false,
        })
      );
    }
  };

  handleAddrChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ addrLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          addrImage: imageUrl,
          addrLoading: false,
        })
      );
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { coverLoading, addrLoading, coverImage, addrImage } = this.state;

    const coverUploadButton = (
      <div>
        <Icon type={coverLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const addrUploadButton = (
      <div>
        <Icon type={addrLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // Only show error after a field is touched.

    return (
      <Form id="video" layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="视频标题">
          {getFieldDecorator('VideoTitle', {
            rules: [{ required: true, message: '请输入视频标题!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="VideoTitle"
            />
          )}
        </Form.Item>
        <Form.Item label="视频描述">
          {getFieldDecorator('VideoDesc', {
            rules: [{ required: true, message: '请输入视频描述!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="VideoDesc"
            />
          )}
        </Form.Item>
        <Form.Item label="视频内容">
          {getFieldDecorator('VideoContent', {
            rules: [{ required: true, message: '请输入视频内容!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="VideoContent"
            />
          )}
        </Form.Item>
        <Form.Item label="视频封面">
          {getFieldDecorator('VideoImg', {
            valuePropName: 'file',
            rules: [{ required: true, message: '请上传视频封面!' }],
          })(
            <Upload
              name="cover"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={this.uploadFile}
              onChange={this.handleCoverChange}
            >
              {coverImage ? <img src={coverImage} alt="cover" /> : coverUploadButton}
            </Upload>
          )}
        </Form.Item>
        <Form.Item label="视频">
          {getFieldDecorator('VideoAddr', {
            valuePropName: 'file',
            rules: [{ required: true, message: '请上传视频封面!' }],
          })(
            <Upload
              name="addr"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={this.uploadFile}
              onChange={this.handleAddrChange}
            >
              {addrImage ? <img src={addrImage} alt="addr" /> : addrUploadButton}
            </Upload>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const VideoForm = Form.create({ name: 'videoForm' })(BaseForm);

export default VideoForm;
