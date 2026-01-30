import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit';
import { showToast } from '../toaster';

export const rtkqToastMiddleware = () => (next) => (action) => {
  if (isFulfilled(action)) {
    const endpointName = action.meta?.arg?.endpointName;

    if (endpointName) {
      next(
        showToast({
          message: `${endpointName} successful`,
          severity: 'success',
        }),
      );
    }
  }

  if (isRejectedWithValue(action)) {
    const endpointName = action.meta?.arg?.endpointName;
    const errorMessage =
      action.payload?.data?.message ||
      action.payload?.error ||
      'Something went wrong';

    next(
      showToast({
        message: endpointName
          ? `${endpointName} failed: ${errorMessage}`
          : errorMessage,
        severity: 'error',
      }),
    );
  }

  return next(action);
};