import { renderHook, act } from "@testing-library/react";
import { useToggle } from "./use-toggle";

describe("useToggle", () => {
  it("should initialize with default value (false)", () => {
    const { result } = renderHook(() => useToggle());

    // Assert the default value is false
    expect(result.current[0]).toBe(false);
  });

  it("should initialize with the provided value", () => {
    const { result } = renderHook(() => useToggle(true));

    // Assert the initial value is true
    expect(result.current[0]).toBe(true);
  });

  it("should toggle the value when toggle function is called", () => {
    const { result } = renderHook(() => useToggle(false));

    // Initial value should be false
    expect(result.current[0]).toBe(false);

    // Call the toggle function
    act(() => result.current[1]());

    // Value should now be toggled to true
    expect(result.current[0]).toBe(true);

    // Toggle again
    act(() => result.current[1]());

    // Value should be toggled back to false
    expect(result.current[0]).toBe(false);
  });

  it("should set the value to true when setTrue function is called", () => {
    const { result } = renderHook(() => useToggle(false));

    // Call the setTrue function
    act(() => result.current[2]());

    // Value should now be true
    expect(result.current[0]).toBe(true);

    // Calling setTrue when already true should keep it true
    act(() => result.current[2]());

    // Value should still be true
    expect(result.current[0]).toBe(true);
  });

  it("should set the value to false when setFalse function is called", () => {
    const { result } = renderHook(() => useToggle(true));

    // Call the setFalse function
    act(() => result.current[3]());

    // Value should now be false
    expect(result.current[0]).toBe(false);

    // Calling setFalse when already false should keep it false
    act(() => result.current[3]());

    // Value should still be false
    expect(result.current[0]).toBe(false);
  });

  it("should maintain independent state for multiple instances", () => {
    // Render multiple instances of the hook
    const { result: result1 } = renderHook(() => useToggle(false));
    const { result: result2 } = renderHook(() => useToggle(true));

    // Initial values should be as expected
    expect(result1.current[0]).toBe(false);
    expect(result2.current[0]).toBe(true);

    // Toggle the first instance
    act(() => result1.current[1]());

    // First instance should be toggled, second should remain unchanged
    expect(result1.current[0]).toBe(true);
    expect(result2.current[0]).toBe(true);

    // Set the second instance to false
    act(() => result2.current[3]());

    // Second instance should be false, first should remain true
    expect(result1.current[0]).toBe(true);
    expect(result2.current[0]).toBe(false);
  });
});
