 import React, { Component, PropTypes } from 'react'

 let instance = []

 const register = (comp) => instance.push(comp)
 const unregister = (comp) => instance.splice(instance.indexOf(comp), 1)

 const historyReplace = (path) => {
    history.replaceState({}, null, path)
    instance.forEach(instance => instance.forceUpdate())
 }

 const historyPush = (path) => {
    history.pushState({}, null, path)
    instance.forEach(instance => instance.forceUpdate())
 }

  const matchPath = (path, options) => {
    const { exact = false, path } = options

    if(!path) {
        return {
            path: null,
            url: pathname,
            isExact: true
        }
    }

    const match = new RegExp(`^${path}`).exec(pathname)

    if(!match) {
        return null
    }

    const url = match[0]
    const isExact = pathname === url

    if(exact && !isExact) {
        return null
    }

    return {
        path,
        url,
        isExact
    }
 }

 class Route extends Component {
    static propTypes: {
        path: PropTypes.string,
        exact: PropTypes.bool,
        component: PropTypes.func,
        render: PropTypes.func
    }

    componentWillMount() {
        addEventListener('popstate', this.handlePop)
        register(this)
    }

    componentWillUnmount() {
        removeEventListener('popstate', this.handlePop)
        unregister(this)
    }

    handlePop = () => {
        this.forceUpdate()
    }

    render() {
        const { path, exact, component, render } = this.propTypes

        const match = matchPath(location.pathname, { path, exact })

        if(!match) {
            return null
        }

        if(component) {
            return React.createElement(component, { match })
        }

        if(render) {
            return ({ match })
        }

        return null
    }
 }

 class Link extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired,
        replace: PropTypes.bool
    }

    handleClick = (event) => {
        const { replace, to } = this.props
        event.preventDafault()

        replace ? historyReplace(to) : historyPush(to)
    }

    render() {
        const { to, children } = this.props

        return (
            <a href={to} onClick={this.handleClick}>
                {children}
            </a>
        )
    }
 }

 class Redirect extends Component {
    static defaultProps = {
        push: false
    }

    static propTypes = {
        to: PropTypes.string.isRequired,
        push: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { to, push } = this.props

        push ? historyPush(to) : historyReplace(to)
    }

    render() {
        return null
    }
 }

