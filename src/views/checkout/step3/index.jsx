import {CHECKOUT_STEP_1, CHECKOUT_STEP_4} from 'constants/routes';
import {Form, Formik} from 'formik';
import {displayActionMessage} from 'helpers/utils';
import {useDocumentTitle, useScrollTop} from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {StepTracker} from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import Total from './Total';
import {addOrder} from 'redux/actions/orderActions';
import {clearBasket} from 'redux/actions/basketActions';
import {setShippingDetails} from 'redux/actions/checkoutActions';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name should be at least 4 characters.')
    .required('Name is required'),
  cardnumber: Yup.string()
    .min(13, 'Card number should be 13-19 digits long')
    .max(19, 'Card number should only be 13-19 digits long')
    .required('Card number is required.'),
  expiry: Yup.date().required('Credit card expiry is required.'),
  ccv: Yup.string()
    .min(3, 'CCV length should be 3-4 digit')
    .max(4, 'CCV length should only be 3-4 digit')
    .required('CCV is required.'),
  type: Yup.string().required('Please select paymend mode'),
});

const Payment = ({shipping, payment, subtotal, profile, basket}) => {
  useDocumentTitle('Check Out Final Step | Art & Craft Gallery');
  useScrollTop();

  const history = useHistory();
  const dispatch = useDispatch();

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal',
  };

  const onConfirm = form => {
    if (form.type === 'paypal') {
      displayActionMessage('Feature not ready yet :)', 'info');
    } else {
      var order = {
        id: new Date().getTime(),
        by: profile,
        basket: basket,
        totalAmount: subtotal,
        dateAdded: new Date().getTime(),
      };
      dispatch(addOrder(order));

      dispatch(clearBasket());
      dispatch(
        setShippingDetails({
          isInternational: false,
        }),
        history.push(CHECKOUT_STEP_4),
      );
    }
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={form => {
          if (form.type === 'paypal') {
            displayActionMessage('Feature not ready yet :)', 'info');
          }
        }}
        onSubmit={onConfirm}>
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <PayPalPayment />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool,
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string,
  }).isRequired,
  subtotal: PropType.number.isRequired,
};

export default withCheckout(Payment);
