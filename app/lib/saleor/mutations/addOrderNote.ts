// lib/saleor/mutations/addOrderNote.ts

export const ADD_ORDER_NOTE_MUTATION = `
  mutation AddOrderNote($orderId: ID!, $message: String!) {
    orderAddNote(order: $orderId, message: $message, user: null) {
      order {
        id
      }
      errors {
        message
      }
    }
  }
`;
