// lib/saleor/mutations/markOrderAsPaid.ts

export const MARK_ORDER_AS_PAID_MUTATION = `
  mutation MarkOrderAsPaid($id: ID!) {
    orderMarkAsPaid(id: $id) {
      order {
        id
        status
      }
      errors {
        message
        field
      }
    }
  }
`;
