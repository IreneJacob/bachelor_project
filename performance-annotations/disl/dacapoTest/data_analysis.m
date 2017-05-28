clear all;
clc;


% LOAD NECESSARY .DAT FILES
A = load(fullfile('./lucene','growTermBuffer.dat'));


% Correlations
PCC = corrcoef(A(:,1),A(:,2));
PCC(2)

% figure
scatter(A(:,1),A(:,2),40,'MarkerEdgeColor',[.5 0.4 .8],...
              'MarkerFaceColor',[.5 0.4 .8],...
              'MarkerFaceAlpha',0.3,...
              'MarkerEdgeAlpha',0.4,...
              'LineWidth',1.5)
grid on
title('org/apache/lucene/analysis/Token.growTermBuffer');
xlabel('feature values') % x-axis label
ylabel('execution time (nanoseconds)') % y-axis label
legend('Integer Parameter Value')
