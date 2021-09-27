import React from 'react'
import { useIntl } from "react-intl"
import { gql, useQuery } from '@apollo/client';
import get from "lodash/get";
import TableControls from '../TableControls'
import { Link } from '../../routes'
import Spinner from '../Spinner'
import numberFormat from "../../utils/numberFormat";
import { defaultRouteParams } from '../../constants';

export const GET_TRANSACTIONS = gql`
  query GetTransactions ($filter: TransactionsFilter!){
    transactions(filter: $filter) {
      items {
        transactionID
      }
      pagination {
        page
        perPage
        count
      }
    }
  }
`;

export const CChain = ({ currentLocale, router }) => {
    const { formatMessage } = useIntl()
    const f = (id, values = {}) => formatMessage({ id }, values)
    const [page, setPage] = React.useState(+router.params.page || defaultRouteParams.common.page);
    const [perPage, setPerPage] = React.useState(+router.params.perPage || defaultRouteParams.common.perPage);
    const [activeTab, setActiveTab] = React.useState('transactions')
    const locale = currentLocale
    React.useEffect(() => {
        if (!router.params.page || router.params.page === 'undefined') {
            setPage(defaultRouteParams.common.page)
        }
        if (!router.params.perPage || router.params.perPage === 'undefined') {
            setPerPage(defaultRouteParams.common.perPage)
        }
    }, [router.params])
    const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
        variables: {
            filter: {
                page,
                perPage
            }
        },
    });
    console.log('data:', data)

    const transactionsTable = () => {
        return (
            <div className="tab-pane fade active show" id="transactions" role="tabpanel" aria-labelledby="nav-home-tab">
                <h2>C-Chain Transactions</h2>
                <div id="datatable_wrapper" className="dataTables_wrapper no-footer">
                    <TableControls
                        locale={locale}
                        page={page}
                        setPage={setPage}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        pagination={data && data.transactions && data.transactions.pagination}
                    />
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="dataTables_scroll">
                                <div className="dataTables_scrollHead" style={{ overflow: 'hidden', position: 'relative', border: '0px', width: '100%' }}><div className="dataTables_scrollHeadInner" style={{ boxSizing: 'content-box', width: '1224px', paddingRight: '0px' }}><table className="display responsive nowrap transactions dataTable no-footer" style={{ width: '1224px', marginLeft: '0px' }} role="grid"><thead>
                                    <tr role="row"><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '137px' }}>HASH</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '226px' }}> </th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '281px' }}> </th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '313px' }}>BLOCK AGE</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '110px' }}>AMOUNT</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '37px' }} /></tr>
                                </thead></table></div></div><div className="dataTables_scrollBody" style={{ position: 'relative', overflow: 'auto', width: '100%' }}><table id="datatable" className="display responsive nowrap transactions dataTable no-footer" style={{ width: '100%' }} role="grid" aria-describedby="datatable_info"><thead>
                                    <tr role="row" style={{ height: '0px' }}><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '137px', paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>HASH</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '226px', paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}> </div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '281px', paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}> </div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '313px', paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>BLOCK AGE</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '110px', paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>AMOUNT</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '37px', paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }} /></th></tr>
                                </thead>
                                    <tbody>
                                        <tr href="transaction-detail.html" role="row" className="odd">
                                            <td>ERC20 MINT</td>
                                            <td><span id="code1" className="spancode">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code1" src="/static/images/pdficon.svg" className="pdf-image" />
                                            </td>
                                            <td>
                                                <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                </div>
                                                <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="timestamp">12 Hours</div>
                                                <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                            </td>
                                            <td>0.00 AVAX</td>
                                            <td><i className="fas fa-circle" aria-hidden="true" /></td>
                                        </tr><tr href="transaction-detail.html" role="row" className="even">
                                            <td>ERC20 MINT</td>
                                            <td><span id="code2" className="spancode">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code2" src="/static/images/pdficon.svg" className="pdf-image" />
                                            </td>
                                            <td>
                                                <div className="innercode">From: <span id="codefrom2">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codefrom2" src="/static/images/pdficon.svg" className="pdf-image" />
                                                </div>
                                                <div className="innercode">To: <span id="codeto2">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto2" src="/static/images/pdficon.svg" className="pdf-image" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="timestamp">12 Hours</div>
                                                <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                            </td>
                                            <td>0.00 AVAX</td>
                                            <td><i className="fas fa-circle" aria-hidden="true" /></td>
                                        </tr><tr href="transaction-detail.html" role="row" className="odd">
                                            <td>ERC20 MINT</td>
                                            <td><span id="code3" className="spancode">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code3" src="/static/images/pdficon.svg" className="pdf-image" />
                                            </td>
                                            <td>
                                                <div className="innercode">From: <span id="codefrom3">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code1" src="/static/images/pdficon.svg" className="pdf-image" />
                                                </div>
                                                <div className="innercode">To: <span id="codeto3">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#codeto3" src="/static/images/pdficon.svg" className="pdf-image" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="timestamp">12 Hours</div>
                                                <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                            </td>
                                            <td>0.00 AVAX</td>
                                            <td><i className="fas fa-circle" aria-hidden="true" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TableControls
                        locale={locale}
                        page={page}
                        setPage={setPage}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        pagination={data && data.transactions && data.transactions.pagination}
                    />
                </div>
            </div>
        )
    }
    const blocksTable = () => {
        return (
            <div className="tab-pane fade active show" id="blocks" role="tabpanel" aria-labelledby="nav-home-tab">
                <h2>Blocks</h2>
                <div id="block_table_wrapper" className="dataTables_wrapper no-footer">
                    <TableControls
                        locale={locale}
                        page={page}
                        setPage={setPage}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        pagination={data && data.transactions && data.transactions.pagination}
                    />
                    <div className="row"><div className="col-sm-12"><div className="dataTables_scroll"><div className="dataTables_scrollHead" style={{ overflow: 'hidden', position: 'relative', border: '0px', width: '100%' }}><div className="dataTables_scrollHeadInner" style={{ boxSizing: 'content-box', width: '1340px', paddingRight: '0px' }}><table className="display responsive nowrap dataTable no-footer" style={{ width: '1340px', marginLeft: '0px' }} role="grid"><thead>
                        <tr role="row"><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '66px' }}>HEIGHT</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '351px' }}>AGE</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '136px' }}>TRANSACTIONS</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '267px' }}>GAS USED</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '181px' }}>TOTAL BURNED</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '98px' }}>VOLUME</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '101px' }}>SIZE</th></tr>
                    </thead></table></div></div><div className="dataTables_scrollBody" style={{ position: 'relative', overflow: 'auto', width: '100%' }}><table id="block_table" className="display responsive nowrap dataTable no-footer" style={{ width: '100%' }} role="grid" aria-describedby="block_table_info"><thead>
                        <tr role="row" style={{ height: '0px' }}><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '66px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>HEIGHT</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '351px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>AGE</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '136px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>TRANSACTIONS</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '267px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>GAS USED</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '181px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>TOTAL BURNED</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '98px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>VOLUME</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '101px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>SIZE</div></th></tr>
                    </thead>
                        <tbody>
                            <tr href="block-detail.html" role="row" className="odd">
                                <td>695</td>
                                <td><span className="white">A day:</span> Sun, 29 Nov 2020 15:17:20 GMT</td>
                                <td>1</td>
                                <td><span className="white">145,585:</span> 0.29% of 50,710,977</td>
                                <td><span className="white">68,424</span> × 10-9 AVAX</td>
                                <td>0.03 AVAX</td>
                                <td>747 BYTES</td>
                            </tr><tr href="block-detail.html" role="row" className="even">
                                <td>695</td>
                                <td><span className="white">A day:</span> Sun, 29 Nov 2020 15:17:20 GMT</td>
                                <td>1</td>
                                <td><span className="white">145,585:</span> 0.29% of 50,710,977</td>
                                <td><span className="white">68,424</span> × 10-9 AVAX</td>
                                <td>0.03 AVAX</td>
                                <td>747 BYTES</td>
                            </tr><tr href="block-detail.html" role="row" className="odd">
                                <td>695</td>
                                <td><span className="white">A day:</span> Sun, 29 Nov 2020 15:17:20 GMT</td>
                                <td>1</td>
                                <td><span className="white">145,585:</span> 0.29% of 50,710,977</td>
                                <td><span className="white">68,424</span> × 10-9 AVAX</td>
                                <td>0.03 AVAX</td>
                                <td>747 BYTES</td>
                            </tr></tbody>
                    </table></div></div></div></div>
                    <TableControls
                        locale={locale}
                        page={page}
                        setPage={setPage}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        pagination={data && data.transactions && data.transactions.pagination}
                    /></div>
            </div>
        )
    }
    const renderTokensTable = () => {
        return (
            <div className="tab-pane fade active show" id="tokens" role="tabpanel" aria-labelledby="nav-profile-tab">
                <h2>Tokens</h2>
                <div id="tokenlist_wrapper" className="dataTables_wrapper no-footer">
                    <TableControls
                        locale={locale}
                        page={page}
                        setPage={setPage}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        pagination={data && data.transactions && data.transactions.pagination}
                    /><div className="row"><div className="col-sm-12"><div className="dataTables_scroll"><div className="dataTables_scrollHead" style={{ overflow: 'hidden', position: 'relative', border: '0px', width: '100%' }}><div className="dataTables_scrollHeadInner" style={{ boxSizing: 'content-box', width: '1340px', paddingRight: '0px' }}><table className="display responsive nowrap transactions dataTable no-footer" style={{ width: '1340px', marginLeft: '0px' }} role="grid"><thead>
                        <tr role="row"><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '66px' }} /><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '126px' }}>NAME</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '578px' }}>CONTRACT ADDRESS</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '265px' }}>CREATED AT</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '205px' }}>TOTAL SUPPLY</th></tr>
                    </thead></table></div></div><div className="dataTables_scrollBody" style={{ position: 'relative', overflow: 'auto', width: '100%' }}><table id="tokenlist" className="display responsive nowrap transactions dataTable no-footer" style={{ width: '100%' }} role="grid" aria-describedby="tokenlist_info"><thead>
                        <tr role="row" style={{ height: '0px' }}><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '66px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }} /></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '126px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>NAME</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '578px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>CONTRACT ADDRESS</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '265px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>CREATED AT</div></th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px', height: '0px', width: '205px' }}><div className="dataTables_sizing" style={{ height: '0px', overflow: 'hidden' }}>TOTAL SUPPLY</div></th></tr>
                    </thead>
                        <tbody>
                            <tr href="token-detail.html" role="row" className="odd">
                                <td>
                                    <div className="rect_wrapp">AXP</div>
                                </td>
                                <td>avaXwap</td>
                                <td> <span id="copycode">0xC43aE57cf…39A931CfCCd1F2A77</span>
                                    <img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                </td>
                                <td>Nov 23, 2020 2:30</td>
                                <td>0.03 AXP</td>
                            </tr><tr href="token-detail.html" role="row" className="even">
                                <td>
                                    <div className="rect_wrapp">AXP</div>
                                </td>
                                <td>avaXwap</td>
                                <td> <span id="copycode">0xC43aE57cf…39A931CfCCd1F2A77</span>
                                    <img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                </td>
                                <td>Nov 23, 2020 2:30
                          </td>
                                <td>0.03 AXP
                          </td>
                            </tr><tr href="token-detail.html" role="row" className="odd">
                                <td>
                                    <div className="rect_wrapp">AXP</div>
                                </td>
                                <td>avaXwap</td>
                                <td> <span id="copycode">0xC43aE57cf…39A931CfCCd1F2A77</span>
                                    <img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                                </td>
                                <td>Nov 23, 2020 2:30
                          </td>
                                <td>0.03 AXP
                          </td>
                            </tr></tbody>
                    </table></div></div></div></div>
                    <TableControls
                        locale={locale}
                        page={page}
                        setPage={setPage}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        pagination={data && data.transactions && data.transactions.pagination}
                    /></div>
            </div>
        )
    }
    const renderActiveTab = () => {
        console.log('activeTab:', activeTab)
        switch (activeTab) {
            case 'transactions':
                return transactionsTable();
            case 'blocks':
                return blocksTable();
            case 'tokens':
                return renderTokensTable();
            default:
                return transactionsTable();
        }
    }
    const handleSetActiveTab = (event, item) => {
        event.preventDefault()
        setActiveTab(item)
    }
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
                            <a className={`nav-item nav-link ${activeTab === 'transactions' ? 'active' : ''}`} id="nav-home-tab" data-toggle="tab" onClick={(e) => handleSetActiveTab(e, 'transactions')}
                                role="tab" aria-controls="nav-home" aria-selected="true">Transactions</a>
                            <a className={`nav-item nav-link ${activeTab === 'blocks' ? 'active' : ''}`} id="nav-profile-tab" data-toggle="tab" onClick={(e) => handleSetActiveTab(e, 'blocks')} role="tab"
                                aria-controls="nav-profile" aria-selected="false">Blocks</a>
                            <a className={`nav-item nav-link ${activeTab === 'tokens' ? 'active' : ''}`} id="nav-contact-tab" data-toggle="tab" role="tab"
                                aria-controls="nav-contact" aria-selected="false" onClick={(e) => handleSetActiveTab(e, 'tokens')}>Tokens</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        {renderActiveTab()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CChain
