import React, { Component } from 'react';

const MESSAGE_EVENT_TYPE = 'message';
const mountIframesrc = (namespace: string) => `${process.env.PUBLIC_URL}/iframes/app.html?namespace=${namespace}?bla=${123}`;

interface IframesProviderProps {
  names: string[]
}
interface IframesProviderState {
  messages: string[]
}

class IframesProvider extends Component<IframesProviderProps, IframesProviderState> {
  iframesRefs: any = {}

  state: IframesProviderState = {
    messages: []
  }

  componentDidMount() {
    window.addEventListener(MESSAGE_EVENT_TYPE, this.handlePostMessages)
  }

  componentWillUnmount() {
    window.removeEventListener(MESSAGE_EVENT_TYPE, () => {
      // TODO: track it
    })
  }

  handlePostMessages = (bla: any) => {
    if (typeof bla.data !== 'string') return;

    const { messages } = this.state;
    const newMessages = messages.concat(bla.data);

    this.setState({ messages: newMessages });
  }

  handleIframeReference = (namespace: string)  => {
    return (iframe: any) => {
      this.iframesRefs[namespace] = iframe;
    }
  }

  render() {
    const { messages } = this.state;
    const { names } = this.props;

    return (
      <div>
        {names.length > 0 ? (
          names.map((namespace: string, key: any) => <iframe
            key={`${namespace}-${key}`}
            title={`${namespace}-${key}`}
            src={mountIframesrc(namespace)}
            style={{ display: 'none' }}
            ref={this.handleIframeReference(namespace)}
          />)
        ) : (
          <div>
            There is no iFrame in here
          </div>
        )}
        {
          messages.map((message, key) => <div key={key}>{message}</div>)
        }
      </div>
    );
  }
}

export default IframesProvider;