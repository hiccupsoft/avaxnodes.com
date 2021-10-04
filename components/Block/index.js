import React from 'react'
import { useIntl } from "react-intl"
import ReactClipboard from 'react-clipboardjs-copy'
import { gql, useQuery } from '@apollo/client';
import TableControls from '../TableControls'
import { Link, Router } from '../../routes'
import Spinner from '../Spinner'
import shortNodeId from '../../utils/shortNodeId';
import moment from 'moment'
import { FaCircle } from "react-icons/fa";

export const GET_BLOCK = gql`
  query GetBlock ($filter: BlockFilter!) {
    block(filter: $filter) {
        blockID
        height
        age
        createdAt
        gasUsed
        transactions
        total_burned
        volume
        size
    }
  }
`;

export const Block = ({ currentLocale, router }) => {
    const { formatMessage } = useIntl()
    const f = (id, values = {}) => formatMessage({ id }, values)
    const locale = currentLocale

    const handleSetActiveTab = (event, item) => {
        event.preventDefault()
        Router.pushRoute(
            `c-chain/${item}`,
        )
    }

    const filter = {
        blockID: router.params.id,
    }
    const { loading, error, data } = useQuery(GET_BLOCK, {
        variables: {
            filter: filter
        },
    });
    const item = (data && data.block) || {};
    const daysLeft = item && item.age && moment(item.age * 1000).diff(moment(), 'days')
    const hoursLeft = item && item.age && moment(item.age * 1000).diff(moment(), 'hours')
    const minutesLeft = item && item.age && moment(item.age * 1000).diff(moment(), 'minutes')
    return (
        <>
            <div className="contact-wrapper">
                <div className="container">
                    <div className="row content-inner">
                        <div className="col-md-8 col-sm-6 col-lg-3">
                            <div className="nodebredcrum">
                                <Link href={`home`} locale={locale} params={{}}>
                                    <a>
                                        <img src="/static/images/home.svg" className="home-image" />
                                    </a>
                                </Link>
                                <span style={{ color: '#292932' }}> </span>

                                <Link href={`c-chain`} locale={locale} params={{}}>
                                    <a className="nodes">/ {f('header.pages.c-chain.title')}</a>
                                </Link>
                                <Link href={`c-chain/blocks`} locale={locale} params={{}}>
                                    <a className="nodes">/ {f('page.block.title')}</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Spinner show={loading} />
            <div className="tab_Wrapper">
                <div className="container">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link" id="nav-home-tab" data-toggle="tab" onClick={(e) => handleSetActiveTab(e, 'transactions')} role="tab" aria-controls="nav-home" aria-selected="true">Transactions</a>
                            <a className="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" role="tab"
                                aria-controls="nav-profile" aria-selected="false">Blocks</a>
                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" role="tab"
                                aria-controls="nav-contact" aria-selected="false" onClick={(e) => handleSetActiveTab(e, 'tokens')}>Tokens</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="blocks" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <div className="block-details-wrapper">
                                <h2 id="block-detail">Block details</h2>
                                <div className="block_wrapper">
                                    <h4 className="block-title">Block hash</h4>
                                    <div className="copy-details-wrapper">
                                        <span id="copycode" className="copy_wrapper">{shortNodeId(item.blockID)}</span>
                                        <img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                    </div>
                                    <div className="block-wrapper-inner">
                                        <div className="block-left">
                                            <div className="block">
                                                <h6>Height</h6>
                                                <p className="white">{item.height}</p>
                                            </div>
                                            <div className="block">
                                                <h6>Timestamp</h6>
                                                <p className="white">{moment(item.createdAt).format("ddd, MMM Do YYYY, h:mm:ss a")}</p>
                                            </div>
                                            <div className="block">
                                                <h6>Size</h6>
                                                <p><span className="white">{item.size}</span> BYTE</p>
                                            </div>
                                        </div>
                                        <div className="block-right">
                                            <div className="block">
                                                <h6>Gas used</h6>
                                                <p><span className="white">12</span> Gas</p>
                                                <span>0.29% of 50,710,977</span>
                                            </div>
                                            <div className="block">
                                                <h6>Total burned</h6>
                                                <p className="white">{item.total_burned} AVAX</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-table" id="tbl_container">
                                        <div className="container">
                                            <table id="datatable" className="display responsive nowrap" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th />
                                                        <th>HASH</th>
                                                        <th />
                                                        <th> AMOUNT</th>
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0
                        </span><img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td>0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0</span>
                                                            <img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span>
                                                                <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span>
                                                                <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td>0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0
                        </span><img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td> 0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0
                        </span><img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td>0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0
                        </span><img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td>0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0
                        </span><img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td>0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0
                        </span><img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td>0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0
                        </span><img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td>0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>ERC20 MINT</td>
                                                        <td>
                                                            <span id="copycode">0x61c6bf...f25299d0
                        </span><img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                                        </td>
                                                        <td>
                                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                            </div>
                                                        </td>
                                                        <td>0.00 AVAX</td>
                                                        <td><i className="fas fa-circle" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></div>
                </div>
            </div>
        </>
    )
}

export default Block
