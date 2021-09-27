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
    console.log('data:',data)
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
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#transactions"
                                role="tab" aria-controls="nav-home" aria-selected="true">Transactions</a>
                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#blocks" role="tab"
                                aria-controls="nav-profile" aria-selected="false">Blocks</a>
                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#tokens" role="tab"
                                aria-controls="nav-contact" aria-selected="false">Tokens</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="transactions" role="tabpanel" aria-labelledby="nav-home-tab">
                            <h2>C-Chain Transactions</h2>
                            <table id="datatable" className="display responsive nowrap transactions" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>HASH</th>
                                        <th> </th>
                                        <th> </th>
                                        <th>BLOCK AGE</th>
                                        <th>AMOUNT</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr href="transaction-detail.html">
                                        <td>ERC20 MINT</td>
                                        <td><span id="code1" className="spancode">P-avax18ylhx…rjg0</span> <img
                                            data-clipboard-action="copy" data-clipboard-target="#code1"
                                            src="asset/images/pdficon.svg" className="pdf-image" />
                                        </td>

                                        <td>
                                            <div className="innercode">From: <span id="codefrom1">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codefrom1"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                            <div className="innercode">To: <span id="codeto1">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codeto1"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="timestamp">12 Hours</div>
                                            <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                        </td>
                                        <td>0.00 AVAX</td>
                                        <td><i className="fas fa-circle"></i></td>
                                    </tr>
                                    <tr href="transaction-detail.html">
                                        <td>ERC20 MINT</td>
                                        <td><span id="code2" className="spancode">P-avax18ylhx…rjg0</span> <img
                                            data-clipboard-action="copy" data-clipboard-target="#code2"
                                            src="asset/images/pdficon.svg" className="pdf-image" />
                                        </td>
                                        <td>
                                            <div className="innercode">From: <span id="codefrom2">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codefrom2"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                            <div className="innercode">To: <span id="codeto2">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codeto2"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="timestamp">12 Hours</div>
                                            <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                        </td>
                                        <td>0.00 AVAX</td>
                                        <td><i className="fas fa-circle"></i></td>
                                    </tr>
                                    <tr href="transaction-detail.html">
                                        <td>ERC20 MINT</td>
                                        <td><span id="code3" className="spancode">P-avax18ylhx…rjg0</span> <img
                                            data-clipboard-action="copy" data-clipboard-target="#code3"
                                            src="asset/images/pdficon.svg" className="pdf-image" />
                                        </td>
                                        <td>
                                            <div className="innercode">From: <span id="codefrom3">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#code1"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                            <div className="innercode">To: <span id="codeto3">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codeto3"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="timestamp">12 Hours</div>
                                            <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                        </td>
                                        <td>0.00 AVAX</td>
                                        <td><i className="fas fa-circle"></i></td>
                                    </tr>
                                    <tr href="transaction-detail.html">
                                        <td>ERC20 MINT</td>
                                        <td><span id="code4" className="spancode">P-avax18ylhx…rjg0</span> <img
                                            data-clipboard-action="copy" data-clipboard-target="#code4"
                                            src="asset/images/pdficon.svg" className="pdf-image" />
                                        </td>
                                        <td>
                                            <div className="innercode">From: <span id="codefrom4">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codefrom4"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                            <div className="innercode">To: <span id="codeto4">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codeto4"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="timestamp">12 Hours</div>
                                            <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                        </td>
                                        <td>0.00 AVAX</td>
                                        <td><i className="fas fa-circle"></i></td>
                                    </tr>
                                    <tr href="transaction-detail.html">
                                        <td>ERC20 MINT</td>
                                        <td><span id="code5" className="spancode">P-avax18ylhx…rjg0</span> <img
                                            data-clipboard-action="copy" data-clipboard-target="#code5"
                                            src="asset/images/pdficon.svg" className="pdf-image" />
                                        </td>
                                        <td>
                                            <div className="innercode">From: <span id="codefrom5">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codefrom5"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                            <div className="innercode">To: <span id="codeto5">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codeto5"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="timestamp">12 Hours</div>
                                            <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                        </td>
                                        <td>0.00 AVAX</td>
                                        <td><i className="fas fa-circle"></i></td>
                                    </tr>
                                    <tr href="transaction-detail.html">
                                        <td>ERC20 MINT</td>
                                        <td><span id="code7" className="spancode">P-avax18ylhx…rjg0</span> <img
                                            data-clipboard-action="copy" data-clipboard-target="#code7"
                                            src="asset/images/pdficon.svg" className="pdf-image" />
                                        </td>
                                        <td>
                                            <div className="innercode">From: <span id="codefrom6">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codefrom6"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                            <div className="innercode">To: <span id="codeto6">P-avax18ylhx…rjg0</span> <img
                                                data-clipboard-action="copy" data-clipboard-target="#codeto6"
                                                src="asset/images/pdficon.svg" className="pdf-image" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="timestamp">12 Hours</div>
                                            <div className="timestamp">Sun, 29 Nov 2020 15:17:20 GMT</div>
                                        </td>
                                        <td>0.00 AVAX</td>
                                        <td><i className="fas fa-circle"></i></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CChain
