import React, { Component } from "react";
import '../Img.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/chart/dist/toastui-chart.css';
import { Viewer } from '@toast-ui/react-editor';
import { slide as Menu } from 'react-burger-menu';

import BASE from '../markdown/base.md';
import HELP from '../markdown/help.md';
import INDEX from '../markdown/index.md';
import LOCALE from '../markdown/locale.md';
import MACRO from '../markdown/macro.md';
import MULTIPLE from '../markdown/multiple.md';
import SEARCH from '../markdown/search.md';
import SETTING from '../markdown/setting.md';
import SINGLE from '../markdown/single.md';
import chart from '@toast-ui/editor-plugin-chart';
import * as Icon from 'react-bootstrap-icons';

const chartOptions = {
    minWidth: 600,
    maxWidth: 600,
    minHeight: 600,
    maxHeight: 600,
  };
  
class Test extends Component {
    editorRef = React.createRef();
    constructor() {
        super();
        
    }

    componentDidMount() {
        this.index();
    }

    index() {
        fetch(INDEX)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }
    base() {
        fetch(BASE)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }
    help() {
        fetch(HELP)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }
    macro() {
        fetch(MACRO)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }
    multiple() {
        fetch(MULTIPLE)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }
    search() {
        fetch(SEARCH)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }
    setting() {
        fetch(SETTING)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }
    single() {
        fetch(SINGLE)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }

    locale() {
        fetch(LOCALE)
        .then(r => r.text())
        .then(text => {
            this.editorRef.current.getInstance().setMarkdown(text);
        });
    }

    render() {
        return (
            <>
            <div id="sidebar">
                <Menu>
                    <a className="menu-item" href="#" onClick={() => this.index()}>
                    <Icon.HouseFill /> Home
                    </a>

                    <a className="menu-item" href="#" onClick={() => this.base()}>
                    <Icon.CaretRightSquareFill /> 기본
                    </a>

                    <a className="menu-item" href="#" onClick={() => this.setting()}>
                    <Icon.CaretRightSquareFill /> 설정
                    </a>

                    <a className="menu-item" href="#" onClick={() => this.single()}>
                    <Icon.CaretRightSquareFill /> 단독제어
                    </a>

                    <a className="menu-item" href="#" onClick={() => this.multiple()}>
                    <Icon.CaretRightSquareFill /> 다중 제어
                    </a>

                    <a className="menu-item" href="#" onClick={() => this.macro()}>
                    <Icon.CaretRightSquareFill /> 매크로
                    </a>

                    <a className="menu-item" href="#" onClick={() => this.search()}>
                    <Icon.CaretRightSquareFill /> 장비조회
                    </a>

                    <a className="menu-item" href="#" onClick={() => this.help()}>
                    <Icon.CaretRightSquareFill /> 도움말
                    </a>

                    <a className="menu-item" href="#" onClick={() => this.locale()}>
                    <Icon.CaretRightSquareFill /> 언어설정
                    </a>
                </Menu>
            </div>
            <div id="page-wrap">
                <Viewer 
                height="350px"
                plugins={[[chart, chartOptions]]} 
                ref={this.editorRef} 
                usageStatistics={false}/>
            </div>
            </>
        );
    };
};
  
export default Test;