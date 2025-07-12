# Recurring Countdown Feature

## Overview

This feature implements a "Deal of the Day" countdown that automatically resets every 10 days, creating a perpetual countdown that never ends. The countdown persists across browser sessions using localStorage.

## How It Works

### 1. Initialization
- When the component first loads, it checks localStorage for an existing target date
- If no date exists or the stored date has passed, it creates a new target date 10 days from the current date
- The target date is stored in localStorage for persistence

### 2. Countdown Logic
- The countdown runs every second, calculating the time remaining until the target date
- When the countdown reaches zero, it automatically resets to another 10 days
- The new target date is immediately stored in localStorage

### 3. Persistence
- The target date is stored in localStorage with the key `dealOfTheDayTargetDate`
- This ensures the countdown continues from where it left off even if the user refreshes the page or closes/reopens the browser
- The countdown will never show 0 days unless there's a brief moment during the reset

## Files Created/Modified

### New Files:
- `src/hooks/use-recurring-countdown.js` - Custom hook for recurring countdown logic
- `src/components/countdown/recurring-countdown.jsx` - React component for the recurring countdown
- `src/wrappers/countdown/RecurringCountDown.js` - Wrapper component with styling
- `src/helpers/recurring-countdown.js` - Utility functions for localStorage management
- `src/pages/other/TestCountdown.js` - Test page to demonstrate the feature

### Modified Files:
- `src/pages/home/HomeFurniture.js` - Updated to use the new recurring countdown
- `src/App.js` - Added route for the test page

## Usage

### Basic Usage:
```jsx
import RecurringCountDown from "../../wrappers/countdown/RecurringCountDown";

<RecurringCountDown
  spaceTopClass="pt-115"
  spaceBottomClass="pb-115"
  bgImg="/assets/img/bg/bg-1.jpg"
  cycleDays={10}
/>
```

### Custom Cycle Period:
```jsx
<RecurringCountDown
  cycleDays={7} // Reset every 7 days instead of 10
  bgImg="/assets/img/bg/bg-1.jpg"
/>
```

### Direct Hook Usage:
```jsx
import useRecurringCountdown from "../../hooks/use-recurring-countdown";

const [days, hours, minutes, seconds] = useRecurringCountdown(10);
```

## Features

1. **Automatic Reset**: Countdown automatically resets every 10 days (or custom period)
2. **Persistence**: Countdown state persists across browser sessions
3. **Error Handling**: Robust error handling for localStorage operations
4. **Customizable**: Can be configured for different cycle periods
5. **Real-time Updates**: Updates every second with accurate countdown
6. **Responsive**: Works on all device sizes

## Testing

Visit `/test-countdown` to see the recurring countdown in action. The test page includes:
- Live demonstration of the countdown
- Explanation of how it works
- Visual feedback of the countdown timer

## Technical Details

### localStorage Key:
- `dealOfTheDayTargetDate` - Stores the target date as ISO string

### Dependencies:
- React hooks (useState, useEffect, useCallback)
- localStorage for persistence
- Date manipulation for countdown calculations

### Browser Compatibility:
- Works in all modern browsers that support localStorage
- Graceful fallback if localStorage is not available

## Future Enhancements

1. **Multiple Countdowns**: Support for multiple recurring countdowns with different periods
2. **Server Sync**: Sync countdown state with server for multi-device consistency
3. **Custom Styling**: More styling options and themes
4. **Analytics**: Track countdown resets and user engagement
5. **Notifications**: Browser notifications when countdown resets 