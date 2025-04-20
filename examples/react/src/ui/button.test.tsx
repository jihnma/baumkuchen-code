import { render, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("should call onClick handler when clicked", () => {
    // Create a mock function for the onClick event
    const handleClick = vi.fn();

    // Render the button with the mock click handler
    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );

    // Find the button element
    const buttonElement = getByRole("button");

    // Simulate a click on the button
    fireEvent.click(buttonElement);

    // Assert that the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should pass all HTML button attributes to the underlying button element", () => {
    // Prepare test attributes
    const testId = "test-button";
    const className = "custom-button";
    const disabled = true;
    const type = "submit";
    const name = "test-button-name";
    const value = "test-value";

    // Render the button with various attributes
    const { getByTestId } = render(
      <Button
        data-testid={testId}
        className={className}
        disabled={disabled}
        type={type}
        name={name}
        value={value}
      >
        Button Text
      </Button>,
    );

    // Get the button element
    const buttonElement = getByTestId(testId);

    // Assert that all attributes were passed down
    expect(buttonElement).toHaveClass(className);
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveAttribute("type", type);
    expect(buttonElement).toHaveAttribute("name", name);
    expect(buttonElement).toHaveAttribute("value", value);
  });

  it("should handle multiple clicks correctly", () => {
    const handleClick = vi.fn();
    const clickCount = 3;

    const { getByRole } = render(
      <Button onClick={handleClick}>Multiple Clicks</Button>,
    );

    const buttonElement = getByRole("button");

    // Simulate multiple clicks
    for (let i = 0; i < clickCount; i++) {
      fireEvent.click(buttonElement);
    }

    // Verify the handler was called the correct number of times
    expect(handleClick).toHaveBeenCalledTimes(clickCount);
  });

  it("should not trigger onClick when disabled", () => {
    const handleClick = vi.fn();

    const { getByRole } = render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>,
    );

    const buttonElement = getByRole("button");

    // Try to click the button
    fireEvent.click(buttonElement);

    // Verify the handler was not called
    expect(handleClick).not.toHaveBeenCalled();
  });
});
