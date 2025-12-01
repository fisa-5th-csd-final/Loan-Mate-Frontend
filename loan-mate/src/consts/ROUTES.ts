// Next 내에서 사용하는 주요 페이지 경로들을 정의

export const PAGES = {
    ROOT: '/',
    MAIN: '/main',
    AUTO_DEPOSIT: '/auto-deposit'
};

export const API = {
    AUTH: {
        LOGIN: '/api/login',
        REFRESH: '/api/auth/refresh',
        LOGOUT: '/api/logout',
    },
    LOAN: {
        LIST: '/api/loans/ledgers',
        RISK: (loanId: number) => `/api/loans/ledger/${loanId}/risk`,
        TOTAL_RISK: '/api/loans/risk',
        DETAIL: (loanId: number) => `/api/loans/ledger/${loanId}`,
        COMMENT: (loanId: number) => `/api/loans/ledger/${loanId}/comment`,
        AUTO_DEPOSIT: (loanId: number) => `/api/loans/ledgers/${loanId}/auto-deposit`,
        DELETE: (loanId: number) => `/api/loans/${loanId}`,
        PREPAYMENT_INFOS: '/api/loans/prepayment-infos',
    },
    SPENDING: {
        MONTHLY: (accountId: number, year: number, month: number) => `/api/spending/${accountId}/${year}/${month}`,
    }
};
